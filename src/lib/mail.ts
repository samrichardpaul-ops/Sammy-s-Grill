import nodemailer from 'nodemailer'

type ReservationMailDetails = {
  full_name: string
  email: string
  phone: string
  reservation_date: string
  reservation_time: string
  guests: number
  special_requests?: string | null
}

function getTransporter() {
  const user = process.env.SMTP_EMAIL?.trim()
  const pass = process.env.SMTP_PASSWORD?.replace(/\s+/g, '')

  if (!user || !pass) {
    throw new Error('SMTP_EMAIL or SMTP_PASSWORD is missing')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

export async function sendOwnerReservationEmail(details: ReservationMailDetails) {
  const smtpEmail = process.env.SMTP_EMAIL
  const notificationEmail = process.env.OWNER_NOTIFICATION_EMAIL?.trim() || 'shreyass5956@gmail.com'

  if (!smtpEmail) {
    throw new Error('SMTP_EMAIL is missing')
  }

  const transporter = getTransporter()

  await transporter.sendMail({
    from: `"Sammy's Grill" <${smtpEmail}>`,
    to: notificationEmail,
    replyTo: details.email.trim(),
    subject: `New Reservation: ${details.full_name.trim()} on ${details.reservation_date}`,
    text: [
      `Name: ${details.full_name.trim()}`,
      `Email: ${details.email.trim()}`,
      `Phone: ${details.phone.trim()}`,
      `Date: ${details.reservation_date}`,
      `Time: ${details.reservation_time}`,
      `Guests: ${details.guests}`,
      `Special requests: ${details.special_requests?.trim() || 'None'}`,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f1f1f;">
        <h2 style="margin-bottom: 16px;">New Reservation</h2>
        <p><strong>Name:</strong> ${details.full_name.trim()}</p>
        <p><strong>Email:</strong> ${details.email.trim()}</p>
        <p><strong>Phone:</strong> ${details.phone.trim()}</p>
        <p><strong>Date:</strong> ${details.reservation_date}</p>
        <p><strong>Time:</strong> ${details.reservation_time}</p>
        <p><strong>Guests:</strong> ${details.guests}</p>
        <p><strong>Special requests:</strong> ${details.special_requests?.trim() || 'None'}</p>
      </div>
    `,
  })
}
