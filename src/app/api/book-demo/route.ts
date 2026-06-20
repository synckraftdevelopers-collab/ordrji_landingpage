import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, location, restaurantName, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !location) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: Name, Email, Phone, and Location are required." },
        { status: 400 }
      );
    }

    const emailSubject = `[Ordrji Demo Request] - ${restaurantName || "New Lead"} (${fullName})`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ebdcb9; border-radius: 8px; background-color: #fdfaf4;">
        <h2 style="color: #e30613; border-bottom: 2px solid #ebdcb9; padding-bottom: 10px; margin-top: 0;">New Demo Booking Request</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #5a5046;">Full Name:</td>
            <td style="padding: 8px 0; color: #1e1b18;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #5a5046;">Email Address:</td>
            <td style="padding: 8px 0; color: #1e1b18;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #5a5046;">Phone Number:</td>
            <td style="padding: 8px 0; color: #1e1b18;"><a href="tel:${phone}">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #5a5046;">Restaurant Name:</td>
            <td style="padding: 8px 0; color: #1e1b18;">${restaurantName || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #5a5046;">Location:</td>
            <td style="padding: 8px 0; color: #1e1b18;">${location}</td>
          </tr>
        </table>
        
        ${
          message
            ? `
          <div style="margin-top: 20px; padding: 12px; background-color: #f7f2e6; border-radius: 6px; border-left: 4px solid #e30613;">
            <p style="margin: 0; font-weight: bold; color: #5a5046; margin-bottom: 6px;">Additional Message / Requirements:</p>
            <p style="margin: 0; color: #1e1b18; white-space: pre-wrap; font-size: 0.95rem; line-height: 1.5;">${message}</p>
          </div>
        `
            : ""
        }
        
        <div style="margin-top: 30px; border-top: 1px solid #ebdcb9; padding-top: 15px; font-size: 0.8rem; color: #8c7d6e; text-align: center;">
          Sent automatically from the Ordrji Landing Page lead capture form.
        </div>
      </div>
    `;

    // 1. Try sending via Resend API if API key is provided
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Ordrji Leads <leads@ordrji.com>",
            to: "grow@synckraft.in",
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (res.ok) {
          return NextResponse.json({ success: true });
        } else {
          const errorData = await res.json();
          console.error("Resend API failed: ", errorData);
        }
      } catch (err) {
        console.error("Error calling Resend API:", err);
      }
    }

    // 2. Try sending via Nodemailer SMTP if SMTP credentials are provided
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${fullName}" <${email}>`,
        to: "grow@synckraft.in",
        replyTo: email,
        subject: emailSubject,
        html: emailHtml,
      });

      return NextResponse.json({ success: true });
    }

    // 3. Fallback for Development: Log to console and return success
    console.log("\n==================================================");
    console.log("DEMO BOOKING LEAD RECEIVED (Development Fallback)");
    console.log("To: grow@synckraft.in");
    console.log(`Subject: ${emailSubject}`);
    console.log("Details:");
    console.log(`  Name:        ${fullName}`);
    console.log(`  Email:       ${email}`);
    console.log(`  Phone:       ${phone}`);
    console.log(`  Restaurant:  ${restaurantName || "N/A"}`);
    console.log(`  Location:    ${location}`);
    console.log(`  Message:     ${message || "N/A"}`);
    console.log("==================================================\n");

    return NextResponse.json({
      success: true,
      warning: "Email not sent because credentials are not configured. Details logged to server console.",
    });
  } catch (error: any) {
    console.error("Error handling book-demo lead:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
