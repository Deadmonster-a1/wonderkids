import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT),
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // Skip if SMTP not configured
  if (!env.SMTP_USER || !env.SMTP_PASS) {
    console.log('📧 Email skipped (SMTP not configured):', options.subject);
    return false;
  }

  try {
    await transporter.sendMail({
      from: `"WonderKids School" <${env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    console.log('📧 Email sent:', options.subject);
    return true;
  } catch (error) {
    console.error('❌ Email failed:', error);
    return false;
  }
}
