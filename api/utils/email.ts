interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // Cloudflare Workers Note: 
  // nodemailer is unsupported here. You must use a REST API (e.g. Resend, SendGrid) to send emails.
  console.log('📧 [STUB] Email sent to:', options.to, 'Subject:', options.subject);
  return true;
}

// -- HTML Email Templates --

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', -apple-system, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; }
    .content { padding: 30px; }
    .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 4px; font-weight: bold; }
    .value { font-size: 16px; color: #0f172a; margin-top: 0; margin-bottom: 16px; font-weight: 500; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>WonderKids School</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} WonderKids School. All rights reserved.<br>
      Inspiring the leaders of tomorrow.
    </div>
  </div>
</body>
</html>
`;

export const templates = {
  adminAdmissionNotification: (data: any) => baseTemplate(`
    <h2 style="color: #4f46e5; margin-top: 0;">New Admission Inquiry! 🎉</h2>
    <p>A new admission inquiry has been submitted. Here are the details:</p>
    <div class="card">
      <div class="label">Student Name</div>
      <div class="value">${escapeHtml(data.studentName)}</div>
      
      <div class="label">Parent / Guardian</div>
      <div class="value">${escapeHtml(data.parentName)}</div>
      
      <div class="label">Grade Applying For</div>
      <div class="value">${escapeHtml(data.gradeApplying)}</div>
      
      <div class="label">Email Address</div>
      <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      
      <div class="label">Phone Number</div>
      <div class="value">${escapeHtml(data.phone)}</div>
      
      <div class="label">Message</div>
      <div class="value">${data.message ? escapeHtml(data.message) : '<i>No message provided</i>'}</div>
    </div>
    <p style="margin-top: 24px; font-size: 14px;">Log in to the <a href="/admin">Admin Dashboard</a> to manage this inquiry.</p>
  `),
  
  parentAdmissionConfirmation: (data: any) => baseTemplate(`
    <h2 style="color: #4f46e5; margin-top: 0;">Thank you for your interest!</h2>
    <p>Dear ${escapeHtml(data.parentName)},</p>
    <p>We're thrilled that you are considering WonderKids School for <strong>${escapeHtml(data.studentName)}</strong>.</p>
    <p>We have successfully received your inquiry for <strong>${escapeHtml(data.gradeApplying)}</strong>. Our admissions team is currently reviewing your details and will reach out to you within the next 24-48 business hours to discuss the next steps in our enrollment process.</p>
    <div class="card">
      <h3 style="margin-top: 0; font-size: 14px; color: #64748b; text-transform: uppercase;">Your Submitted Details</h3>
      <div class="label">Student</div>
      <div class="value">${escapeHtml(data.studentName)}</div>
      <div class="label">Phone</div>
      <div class="value">${escapeHtml(data.phone)}</div>
    </div>
    <p style="margin-top: 24px;">If you have any immediate questions, feel free to reply directly to this email!</p>
  `),

  adminContactNotification: (data: any) => baseTemplate(`
    <h2 style="color: #4f46e5; margin-top: 0;">New Contact Form Message</h2>
    <p>Someone reached out via the contact form on the website.</p>
    <div class="card">
      <div class="label">Name</div>
      <div class="value">${escapeHtml(data.name)}</div>
      
      <div class="label">Email Address</div>
      <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      
      <div class="label">Message</div>
      <div class="value" style="white-space: pre-wrap;">${escapeHtml(data.message)}</div>
    </div>
  `),

  userContactConfirmation: (data: any) => baseTemplate(`
    <h2 style="color: #4f46e5; margin-top: 0;">We've received your message!</h2>
    <p>Hi ${escapeHtml(data.name)},</p>
    <p>Thank you for reaching out to WonderKids School. We've safely received your message and our support team will get back to you as soon as possible.</p>
    <div class="card">
      <div class="label">Your Message</div>
      <div class="value" style="white-space: pre-wrap; font-style: italic;">"${escapeHtml(data.message)}"</div>
    </div>
    <p style="margin-top: 24px;">Have a wonderful day!</p>
  `)
};
