/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, location, restaurantName, message } = body;

    // ── Validate required fields ─────────────────────────────
    if (!fullName || !email || !phone || !location) {
      return NextResponse.json(
        { success: false, error: "Name, Email, Phone, and Location are required." },
        { status: 400 }
      );
    }

    // ── Save lead to Supabase FIRST (always) ─────────────────
    const { error: dbError } = await (supabaseAdmin as any)
      .from("demo_leads")
      .insert({
        full_name:       fullName,
        email:           email,
        phone:           phone,
        location:        location,
        restaurant_name: restaurantName || null,
        message:         message        || null,
        status:          "new",
      });

    if (dbError) {
      // Log the error but don't block the email from sending
      console.error("[book-demo] Supabase insert error:", JSON.stringify(dbError));
    } else {
      console.log("[book-demo] Lead saved to Supabase successfully");
    }

    const emailSubject = `[Ordrji Demo Request] - ${restaurantName || "New Lead"} (${fullName})`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ebdcb9; border-radius: 8px; background-color: #fdfaf4;">
        <h2 style="color: #da0404; border-bottom: 2px solid #ebdcb9; padding-bottom: 10px; margin-top: 0;">New Demo Booking Request</h2>
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
          <div style="margin-top: 20px; padding: 12px; background-color: #f7f2e6; border-radius: 6px; border-left: 4px solid #da0404;">
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

    const thankYouSubject = "Thank you for booking a demo with Ordrji!";
    const thankYouHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #ebdcb9; border-radius: 12px; background-color: #fdfaf4; color: #1e1b18;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="color: #da0404; margin: 0 0 8px 0; font-size: 22px;">Demo Request Received!</h2>
          <p style="color: #5a5046; font-size: 15px; margin: 0;">Hi ${fullName}, thank you for reaching out to Ordrji.</p>
        </div>
        
        <div style="background-color: #ffffff; border: 1px solid rgba(0, 0, 0, 0.04); border-radius: 8px; padding: 18px; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);">
          <p style="margin-top: 0; line-height: 1.5; font-size: 14px;">We've received your request for a personalized demo of the <strong>Ordrji Restaurant Operating System</strong>. Our team is already reviewing your details!</p>
          <p style="line-height: 1.5; font-size: 14px; font-weight: bold; color: #5a5046; margin-bottom: 8px;">Submitted Details:</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #ebdcb9;">
              <td style="padding: 8px 0; font-weight: bold; color: #5a5046; width: 140px;">Restaurant Name:</td>
              <td style="padding: 8px 0; color: #1e1b18;">${restaurantName || "Not specified"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ebdcb9;">
              <td style="padding: 8px 0; font-weight: bold; color: #5a5046;">Location:</td>
              <td style="padding: 8px 0; color: #1e1b18;">${location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #5a5046;">Phone Number:</td>
              <td style="padding: 8px 0; color: #1e1b18;">${phone}</td>
            </tr>
          </table>
        </div>

        <div style="line-height: 1.5; font-size: 14px; margin-bottom: 25px;">
          <p style="font-weight: bold; margin-bottom: 6px;">What's next?</p>
          <ul style="padding-left: 20px; margin-top: 0;">
            <li style="margin-bottom: 6px;">One of our product specialists will reach out to you at this email or via phone within 24 hours.</li>
            <li style="margin-bottom: 6px;">We'll prepare a custom walk-through based on your restaurant type to show you how our system connects QR ordering, KDS, inventory, and billing.</li>
          </ul>
        </div>

        <div style="margin-top: 30px; border-top: 1px solid #ebdcb9; padding-top: 15px; font-size: 0.8rem; color: #8c7d6e; text-align: center;">
          <strong>Ordrji Operating System</strong><br/>
          Connecting POS, QR Ordering, Kitchen, and CRM.
        </div>
      </div>
    `;

    // 1. Try sending via Resend API if API key is provided
    if (process.env.RESEND_API_KEY) {
      try {
        const adminRes = await fetch("https://api.resend.com/emails", {
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

        const customerRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Ordrji <leads@ordrji.com>",
            to: email,
            subject: thankYouSubject,
            html: thankYouHtml,
          }),
        });

        if (adminRes.ok && customerRes.ok) {
          return NextResponse.json({ success: true });
        } else {
          console.error("Resend API partial or full failure. Admin OK:", adminRes.ok, "Customer OK:", customerRes.ok);
          if (adminRes.ok || customerRes.ok) {
            return NextResponse.json({ success: true, warning: "One of the emails failed to send via Resend." });
          }
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

      // Send to Admin (notification)
      await transporter.sendMail({
        from: `"Ordrji Leads" <${process.env.SMTP_USER}>`,
        to: "grow@synckraft.in",
        replyTo: email,
        subject: emailSubject,
        html: emailHtml,
      });

      // Send to User (thank you confirmation)
      await transporter.sendMail({
        from: `"Ordrji" <${process.env.SMTP_USER}>`,
        to: email,
        replyTo: "grow@synckraft.in",
        subject: thankYouSubject,
        html: thankYouHtml,
      });

      return NextResponse.json({ success: true });
    }

    // 3. Fallback for Development: Log to console and return success
    console.log("\n==================================================");
    console.log("DEMO BOOKING LEAD RECEIVED (Development Fallback)");
    console.log("To Admin: grow@synckraft.in");
    console.log(`Subject Admin: ${emailSubject}`);
    console.log(`To Customer: ${email}`);
    console.log(`Subject Customer: ${thankYouSubject}`);
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
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Error handling book-demo lead:", err);
    return NextResponse.json(
      { success: false, error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
