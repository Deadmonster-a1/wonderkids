import { Request, Response } from 'express';
import prisma from '../config/db.js';
import { sendEmail } from '../utils/email.js';
import { env } from '../config/env.js';

// PUBLIC: Submit contact form
export async function submitContact(req: Request, res: Response): Promise<void> {
  const { name, email, message } = req.body;

  const submission = await prisma.contactSubmission.create({
    data: { name, email, message },
  });

  // Notify admin via email (non-blocking)
  sendEmail({
    to: env.ADMIN_EMAIL,
    subject: `New Contact: ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  }).catch(() => {}); // Don't fail the request if email fails

  res.status(201).json({ success: true, id: submission.id });
}

// ADMIN: Get all contact submissions
export async function getContacts(_req: Request, res: Response): Promise<void> {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json({ data: contacts });
}

// ADMIN: Update contact status/notes
export async function updateContact(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  const contact = await prisma.contactSubmission.update({
    where: { id },
    data: { status, adminNotes },
  });
  res.json({ data: contact });
}
