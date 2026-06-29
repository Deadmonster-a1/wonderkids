import { Request, Response } from 'express';
import prisma from '../config/db.js';
import { sendEmail } from '../utils/email.js';
import { env } from '../config/env.js';

// PUBLIC: Submit admission inquiry
export async function submitInquiry(req: Request, res: Response): Promise<void> {
  const { studentName, parentName, email, phone, gradeApplying, message } = req.body;

  const inquiry = await prisma.admissionInquiry.create({
    data: { studentName, parentName, email, phone, gradeApplying, message },
  });

  // Notify admin
  sendEmail({
    to: env.ADMIN_EMAIL,
    subject: `New Admission Inquiry: ${studentName} for ${gradeApplying}`,
    html: `
      <h2>New Admission Inquiry</h2>
      <p><strong>Student:</strong> ${studentName}</p>
      <p><strong>Parent:</strong> ${parentName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Grade:</strong> ${gradeApplying}</p>
      <p><strong>Message:</strong> ${message || 'N/A'}</p>
    `,
  }).catch(() => {});

  res.status(201).json({ success: true, id: inquiry.id });
}

// ADMIN: Get all admission inquiries
export async function getInquiries(_req: Request, res: Response): Promise<void> {
  const inquiries = await prisma.admissionInquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json({ data: inquiries });
}

// ADMIN: Update admission status
export async function updateInquiry(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

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
        <p>Dear ${inquiry.parentName},</p>
        <p>The admission status for <strong>${inquiry.studentName}</strong> (${inquiry.gradeApplying}) has been updated to: <strong>${status}</strong></p>
        <p>If you have any questions, please contact us.</p>
        <p>Best regards,<br/>WonderKids School</p>
      `,
    }).catch(() => {});
  }

  res.json({ data: inquiry });
}
