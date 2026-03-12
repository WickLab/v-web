// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { createTransporter, fromAddress, mailboxTo } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const transporter = createTransporter();

    await transporter.sendMail({
      to: mailboxTo,
      replyTo: email,
      subject: subject?.trim() ? `Portfolio Contact: ${subject}` : "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to send message." },
      { status: 500 }
    );
  }
}