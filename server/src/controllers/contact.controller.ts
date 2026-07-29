import { Context } from 'hono';
import prisma from '../config/db.js';
import { sendEmail, escapeHtml } from '../utils/email.js';
import { toCsv } from '../utils/csv.js';
import { env } from '../config/env.js';
import { broadcastSSE } from '../utils/sse.js';
import { templates } from '../utils/email.js';

// PUBLIC: Submit contact form
export async function submitContact(c: Context) {
  const { name, email, message } = (await c.req.json());

  const submission = await prisma.contactSubmission.create({
    data: { name, email, message },
  });

  // Notify admin via email (non-blocking)
  sendEmail({
    to: env.ADMIN_EMAIL,
    subject: `New Contact: ${name}`,
    html: templates.adminContactNotification({ name, email, message }),
  }).catch(() => {}); // Don't fail the request if email fails

  // Confirm receipt to the sender (non-blocking)
  sendEmail({
    to: email,
    subject: 'We received your message — WonderKids',
    html: templates.userContactConfirmation({ name, message }),
  }).catch(() => {});

  // Trigger push notification to connected clients
  broadcastSSE('new_contact', {
    id: submission.id,
    name,
    email
  });

  return c.json({ success: true, id: submission.id }, 201);
}

// ADMIN: Get all contact submissions
export async function getContacts(c: Context) {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return c.json({ data: contacts });
}

// ADMIN: Export all contact submissions as CSV (opens in Excel)
export async function exportContacts(c: Context) {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const csv = toCsv(
    contacts.map((c) => ({
      Name: c.name,
      Email: c.email,
      Message: c.message,
      Status: c.status,
      AdminNotes: c.adminNotes ?? '',
      SubmittedAt: c.createdAt.toISOString(),
    }))
  );

  c.header('Content-Type', 'text/csv; charset=utf-8');
  c.header('Content-Disposition', 'attachment; filename="contact-messages.csv"');
  return c.body(csv);
}

// ADMIN: Update contact status/notes
export async function updateContact(c: Context) {
  const { id } = c.req.param();
  const { status, adminNotes } = (await c.req.json());
  const contact = await prisma.contactSubmission.update({
    where: { id },
    data: { status, adminNotes },
  });
  return c.json({ data: contact });
}
