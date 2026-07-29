import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

export default {
  async fetch(req: Request) {
    try {
      const payload = await req.json();
      console.log("Received webhook payload:", payload);

      // We only care about INSERT events
      if (payload.type !== "INSERT") {
        return new Response(JSON.stringify({ message: "Not an INSERT event, skipping." }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      const table = payload.table;
      const record = payload.record;
      
      let subject = "";
      let content = "";

      if (table === "ContactSubmission") {
        subject = `New Contact Form Submission from ${record.name}`;
        content = `
          You have received a new contact form submission!
          
          Name: ${record.name}
          Email: ${record.email}
          Message:
          ${record.message}
        `;
      } else if (table === "AdmissionInquiry") {
        subject = `New Admission Inquiry from ${record.parentName}`;
        content = `
          You have received a new admission inquiry!
          
          Parent Name: ${record.parentName}
          Student Name: ${record.studentName}
          Grade Applying: ${record.gradeApplying}
          Email: ${record.email}
          Phone: ${record.phone || "N/A"}
          Message:
          ${record.message || "N/A"}
        `;
      } else {
        return new Response(JSON.stringify({ message: "Table not supported for email, skipping." }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // Initialize SMTP Client
      const client = new SmtpClient();
      
      const host = Deno.env.get("SMTP_HOST");
      const port = parseInt(Deno.env.get("SMTP_PORT") || "587");
      const username = Deno.env.get("SMTP_USER");
      const password = Deno.env.get("SMTP_PASS");

      if (!host || !username || !password) {
        throw new Error("Missing SMTP credentials in environment variables");
      }

      console.log(`Connecting to SMTP server ${host}:${port}...`);
      await client.connectTLS({
        hostname: host,
        port: port,
        username: username,
        password: password,
      });

      console.log("Sending email...");
      await client.send({
        from: username,
        to: username, // Send to yourself
        subject: subject,
        content: content,
      });

      console.log("Email sent successfully!");
      await client.close();

      return new Response(JSON.stringify({ message: "Email sent successfully" }), {
        headers: { "Content-Type": "application/json" },
      });

    } catch (err: any) {
      console.error("Error sending email:", err);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
