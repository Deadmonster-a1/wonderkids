import { Context } from 'hono';
import prisma from '../config/db.js';
import { sendEmail, escapeHtml } from '../utils/email.js';
import { toCsv } from '../utils/csv.js';
import { broadcastSSE } from '../utils/sse.js';
import { templates } from '../utils/email.js';

// PUBLIC: Submit admission inquiry
export async function submitInquiry(c: Context) {
  const { studentName, parentName, email, phone, gradeApplying, message } = (await c.req.json());

  const inquiry = await prisma.admissionInquiry.create({
    data: { studentName, parentName, email, phone, gradeApplying, message },
  });

  // Notify admin via email
  sendEmail({
    to: (c.env as any).ADMIN_EMAIL,
    subject: `New Admission Inquiry: ${studentName} for ${gradeApplying}`,
    html: templates.adminAdmissionNotification({ studentName, parentName, email, phone, gradeApplying, message }),
  }).catch(() => {});

  // Confirm receipt to the parent
  sendEmail({
    to: email,
    subject: `We received your admission inquiry for ${studentName}`,
    html: templates.parentAdmissionConfirmation({ studentName, parentName, gradeApplying, phone }),
  }).catch(() => {});

  // Trigger push notification to connected clients
  broadcastSSE('new_application', {
    id: inquiry.id,
    studentName,
    parentName,
    gradeApplying
  });

  return c.json({ success: true, id: inquiry.id }, 201);
}

// ADMIN: Get all admission inquiries
export async function getInquiries(c: Context) {
  const inquiries = await prisma.admissionInquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return c.json({ data: inquiries });
}

// ADMIN: Export all admission inquiries as CSV (opens in Excel)
export async function exportInquiries(c: Context) {
  const inquiries = await prisma.admissionInquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const csv = toCsv(
    inquiries.map((i) => ({
      StudentName: i.studentName,
      ParentName: i.parentName,
      Email: i.email,
      Phone: i.phone,
      GradeApplying: i.gradeApplying,
      Message: i.message ?? '',
      Status: i.status,
      AdminNotes: i.adminNotes ?? '',
      SubmittedAt: i.createdAt.toISOString(),
    }))
  );

  c.header('Content-Type', 'text/csv; charset=utf-8');
  c.header('Content-Disposition', 'attachment; filename="admission-inquiries.csv"');
  return c.body(csv);
}

// ADMIN: Update admission status
export async function updateInquiry(c: Context) {
  const { id } = c.req.param();
  const { status, adminNotes } = (await c.req.json());

  const inquiry = await prisma.admissionInquiry.update({
    where: { id },
    data: { status, adminNotes },
  });

  // Notify parent on status change
  if (status) {
    sendEmail({
      to: inquiry.email,
      subject: `Admission Update for ${inquiry.studentName}`,
      html: `
        <h2>Admission Status Update</h2>
        <p>Dear ${escapeHtml(inquiry.parentName)},</p>
        <p>The admission status for <strong>${escapeHtml(inquiry.studentName)}</strong> (${escapeHtml(inquiry.gradeApplying)}) has been updated to: <strong>${escapeHtml(status)}</strong></p>
        <p>If you have any questions, please contact us.</p>
        <p>Best regards,<br/>WonderKids School</p>
      `,
    }).catch(() => {});
  }

  return c.json({ data: inquiry });
}
