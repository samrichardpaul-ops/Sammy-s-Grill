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
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  if (!SMTP_EMAIL || !SMTP_PASSWORD) {
    console.warn("SMTP credentials not found in environment variables. Email will not be sent.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Standard setup assuming Gmail, but can be changed later
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const customerMailOptions = {
    from: `"Sammy's Grill" <${SMTP_EMAIL}>`,
    to: to,
    subject: `Reservation Confirmed - Sammy's Grill`,
    text: `Your reservation at Sammy's Grill is confirmed for ${details.reservation_date} at ${details.reservation_time} for ${details.guests} guests.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #e8501a;">Thank You for Your Reservation!</h2>
        <p>Dear ${details.full_name},</p>
        <p>Your table has been successfully reserved at Sammy's Grill.</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee;">
          <p><strong>📅 Date:</strong> ${details.reservation_date}</p>
          <p><strong>⏰ Time:</strong> ${details.reservation_time}</p>
          <p><strong>👥 Guests:</strong> ${details.guests}</p>
          ${details.special_requests ? `<p><strong>📝 Special Requests:</strong> ${details.special_requests}</p>` : ''}
        </div>
        
        <p>We look forward to serving you!</p>
        <br/>
        <p><strong>Sammy's Grill Team</strong></p>
      </div>
    `,
  };

  const ownerMailOptions = {
    from: `"Sammy's Grill Website" <${SMTP_EMAIL}>`,
    to: SMTP_EMAIL,
    subject: `New Reservation: ${details.full_name} - ${details.reservation_date}`,
    html: `
      <h2>New Reservation Received</h2>
      <p><strong>Name:</strong> ${details.full_name}</p>
      <p><strong>Email:</strong> ${to}</p>
      <p><strong>Date:</strong> ${details.reservation_date}</p>
      <p><strong>Time:</strong> ${details.reservation_time}</p>
      <p><strong>Guests:</strong> ${details.guests}</p>
      <p><strong>Requests:</strong> ${details.special_requests || 'None'}</p>
    `,
  };

  try {
    await transporter.sendMail(customerMailOptions);
    console.log(`Reservation email sent successfully to CUSTOMER: ${to}`);
    
    await transporter.sendMail(ownerMailOptions);
    console.log(`Notification email sent successfully to OWNER: ${SMTP_EMAIL}`);
  } catch (error) {
    console.error("Failed to send reservation emails:", error);
  }
}
