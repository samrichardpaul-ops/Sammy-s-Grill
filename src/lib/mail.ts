import nodemailer from 'nodemailer';

export async function sendReservationEmail(
  to: string,
  details: {
    full_name: string;
    reservation_date: string;
    reservation_time: string;
    guests: number;
    special_requests?: string | null;
  }
) {
  const SMTP_EMAIL = process.env.SMTP_EMAIL;
  const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

  console.log("Checking SMTP configured env vars...");
  console.log("SMTP_EMAIL defined:", !!SMTP_EMAIL);
  console.log("SMTP_PASSWORD defined:", !!SMTP_PASSWORD);

  if (!SMTP_EMAIL || !SMTP_PASSWORD) {
    console.error("❌ SMTP credentials NOT FOUND in environment variables on Vercel!");
    throw new Error("SMTP_MISSING");
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Sammy's Grill" <${SMTP_EMAIL}>`,
    to: [to, SMTP_EMAIL].join(', '), // Send to both customer and owner
    subject: `Reservation Confirmed - Sammy's Grill`,
    text: `Your reservation at Sammy's Grill is confirmed for ${details.reservation_date} at ${details.reservation_time} for ${details.guests} guests.`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.4);">
        <!-- Header -->
        <div style="background-color: #242424; padding: 40px 20px; text-align: center; border-bottom: 3px solid #e8501a;">
          <h1 style="color: #e8501a; margin: 0; font-size: 32px; letter-spacing: 2px; text-transform: uppercase;">Sammy's Grill</h1>
          <p style="color: #d4a853; margin-top: 8px; font-style: italic; font-size: 18px; margin-bottom: 0;">Your Table is Ready</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #ffffff; margin-top: 0;">Hi ${details.full_name},</h2>
          <p style="color: #cccccc; font-size: 16px; line-height: 1.6;">
            We are thrilled to confirm your reservation at Sammy's Grill. Your unforgettable dining experience has been successfully booked.
          </p>
          
          <!-- Reservation Details Card -->
          <div style="background-color: #2a2a2a; border-left: 4px solid #e8501a; padding: 25px; border-radius: 8px; margin: 30px 0;">
            <p style="margin: 0 0 15px 0; font-size: 18px;">
              <span style="color: #8a8a8a; display: inline-block; width: 80px;">Date:</span> 
              <strong style="color: #ffffff;">${details.reservation_date}</strong>
            </p>
            <p style="margin: 0 0 15px 0; font-size: 18px;">
              <span style="color: #8a8a8a; display: inline-block; width: 80px;">Time:</span> 
              <strong style="color: #ffffff;">${details.reservation_time}</strong>
            </p>
            <p style="margin: 0 0 ${details.special_requests ? '15px' : '0'} 0; font-size: 18px;">
              <span style="color: #8a8a8a; display: inline-block; width: 80px;">Guests:</span> 
              <strong style="color: #ffffff;">${details.guests} ${details.guests === 1 ? 'Person' : 'People'}</strong>
            </p>
            ${details.special_requests ? `
            <p style="margin: 0; font-size: 16px; line-height: 1.5;">
              <span style="color: #8a8a8a; display: block; margin-bottom: 5px;">Requests:</span> 
              <strong style="color: #e8501a; font-weight: normal;">"${details.special_requests}"</strong>
            </p>
            ` : ''}
          </div>
          
          <p style="color: #cccccc; font-size: 16px; line-height: 1.6;">
            If you need to make any changes to your reservation, please let us know. We look forward to serving you!
          </p>
        </div>
      </div>
    `,
  };

  try {
    console.log("Sending email via Nodemailer...");
    await transporter.verify(); // Check if SMTP credentials are valid before sending
    console.log("SMTP Verified successfully. Sending Mail...");
    await transporter.sendMail(mailOptions);
    console.log("✅ Email successfully sent via Nodemailer!");
  } catch (error: any) {
    console.error("❌ Failed to send Nodemailer email:", error);
    throw error;
  }
}
