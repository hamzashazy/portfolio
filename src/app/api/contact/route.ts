import nodemailer from "nodemailer";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const to = process.env.EMAIL_TO || "hamzashazy.work@gmail.com";

    if (!user || !pass) {
      return new Response(JSON.stringify({ error: "Email credentials not configured" }), { status: 500 });
    }

    // Primary: Gmail SSL 465
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    // Verify; if it fails, try TLS 587 fallback
    try {
      await transporter.verify();
    } catch (primaryError) {
      try {
        transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: { user, pass },
        });
        await transporter.verify();
      } catch (secondaryError) {
        return new Response(
          JSON.stringify({
            error: "Email transporter verification failed. Check EMAIL_USER/EMAIL_PASS (use an App Password for Gmail).",
            details: (secondaryError as Error).message,
          }),
          { status: 500 }
        );
      }
    }

    const mailOptions = {
      from: `Portfolio Contact <${user}>`,
      to,
      replyTo: email,
      subject: `Portfolio Message: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
          <h2>New Message from Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${message}</pre>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Failed to send email. Verify EMAIL_TO and message content.", details: (e as Error).message }),
        { status: 500 }
      );
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error parsing request." }), { status: 500 });
  }
}


