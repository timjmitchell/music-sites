import { Resend } from "resend";
import { NextResponse } from "next/server";
import { WelcomeEmail } from "@/components/emails/welcome";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    // Add to contacts
    await resend.contacts.create({ email });

    // Send welcome email
    const fromAddress = process.env.RESEND_FROM_ADDRESS || "onboarding@resend.dev";
    const downloadUrl = process.env.DOWNLOAD_URL;

    const { error } = await resend.emails.send({
      from: `Club Business <${fromAddress}>`,
      to: email,
      subject: "Welcome to Club Business",
      react: WelcomeEmail({ downloadUrl }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
