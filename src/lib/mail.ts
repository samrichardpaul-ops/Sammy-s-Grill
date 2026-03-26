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

  const mailOptions = {
    from: `"Sammy's Grill" <${SMTP_EMAIL}>`,
    replyTo: SMTP_EMAIL,
    to: to,
    bcc: SMTP_EMAIL, // Send a copy to the restaurant owner
    subject: `Reservation Confirmation - ${details.reservation_date} at ${details.reservation_time}`,
    text: `Your reservation at Sammy's Grill is confirmed for ${details.reservation_date} at ${details.reservation_time} for ${details.guests} guests.`,
    html: `
      <h2>Reservation Confirmation</h2>
      <p>Dear ${details.full_name},</p>
      <p>Your reservation at Sammy's Grill has been confirmed!</p>
      <br />
      <h3>Reservation Details:</h3>
      <ul>
        <li><strong>Date:</strong> ${details.reservation_date}</li>
        <li><strong>Time:</strong> ${details.reservation_time}</li>
        <li><strong>Guests:</strong> ${details.guests}</li>
        ${details.special_requests ? `<li><strong>Special Requests:</strong> ${details.special_requests}</li>` : ''}
      </ul>
      <br />
      <p>We look forward to serving you!</p>
      <p>Best Regards,</p>
      <p>Sammy's Grill Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reservation email sent successfully to ${to}`);
  } catch (error) {
    console.error("Failed to send reservation email:", error);
  }
}
