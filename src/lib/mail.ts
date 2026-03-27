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
      <div style="margin:0; padding:24px; background:#f3efe9; font-family:Arial, Helvetica, sans-serif; color:#f5f0e8;">
        <div style="max-width:680px; margin:0 auto; background:#1b1b1b; border-radius:18px; overflow:hidden; border:1px solid #2e2e2e;">
          <div style="padding:36px 32px 26px; text-align:center; background:linear-gradient(180deg, #26201d 0%, #1b1b1b 100%);">
            <div style="font-size:22px; letter-spacing:3px; font-weight:800; color:#f05a24; text-transform:uppercase;">
              Sammy's Grill
            </div>
            <div style="margin-top:12px; font-size:28px; font-weight:700; color:#f5f0e8;">
              New Reservation Alert
            </div>
            <div style="margin-top:10px; font-size:15px; color:#d4a853;">
              A new customer just booked a table
            </div>
          </div>

          <div style="height:3px; background:#f05a24;"></div>

          <div style="padding:32px;">
            <p style="margin:0 0 22px; font-size:18px; line-height:1.7; color:#d7d2cb;">
              A reservation request has been submitted through the website.
            </p>

            <div style="background:#2b2b2b; border-radius:16px; padding:24px; border-left:5px solid #f05a24; margin-bottom:24px;">
              <div style="margin-bottom:14px; font-size:16px; color:#b8b2aa;">
                <strong style="display:inline-block; min-width:90px; color:#b8b2aa;">Name:</strong>
                <span style="font-size:24px; font-weight:800; color:#ffffff;">${details.full_name.trim()}</span>
              </div>
              <div style="margin-bottom:14px; font-size:16px; color:#b8b2aa;">
                <strong style="display:inline-block; min-width:90px; color:#b8b2aa;">Email:</strong>
                <span style="font-size:18px; font-weight:700; color:#ffffff;">${details.email.trim()}</span>
              </div>
              <div style="margin-bottom:14px; font-size:16px; color:#b8b2aa;">
                <strong style="display:inline-block; min-width:90px; color:#b8b2aa;">Phone:</strong>
                <span style="font-size:18px; font-weight:700; color:#ffffff;">${details.phone.trim()}</span>
              </div>
              <div style="margin-bottom:14px; font-size:16px; color:#b8b2aa;">
                <strong style="display:inline-block; min-width:90px; color:#b8b2aa;">Date:</strong>
                <span style="font-size:24px; font-weight:800; color:#ffffff;">${details.reservation_date}</span>
              </div>
              <div style="margin-bottom:14px; font-size:16px; color:#b8b2aa;">
                <strong style="display:inline-block; min-width:90px; color:#b8b2aa;">Time:</strong>
                <span style="font-size:24px; font-weight:800; color:#ffffff;">${details.reservation_time}</span>
              </div>
              <div style="margin-bottom:14px; font-size:16px; color:#b8b2aa;">
                <strong style="display:inline-block; min-width:90px; color:#b8b2aa;">Guests:</strong>
                <span style="font-size:24px; font-weight:800; color:#ffffff;">${details.guests} ${details.guests === 1 ? 'Person' : 'People'}</span>
              </div>
              <div style="font-size:16px; color:#b8b2aa;">
                <strong style="display:block; margin-bottom:8px; color:#b8b2aa;">Requests:</strong>
                <span style="font-size:22px; font-weight:700; color:#f05a24;">
                  ${details.special_requests?.trim() || 'None'}
                </span>
              </div>
            </div>

            <p style="margin:0; font-size:15px; line-height:1.7; color:#d7d2cb;">
              Reply directly to this email to reach the customer.
            </p>
          </div>
        </div>
      </div>
    `,
  })
}

export async function sendClientReservationEmail(details: ReservationMailDetails) {
  const smtpEmail = process.env.SMTP_EMAIL?.trim()

  if (!smtpEmail) {
    throw new Error('SMTP_EMAIL is missing')
  }

  const transporter = getTransporter()

  await transporter.sendMail({
    from: `"Sammy's Grill" <${smtpEmail}>`,
    to: details.email.trim(),
    replyTo: smtpEmail,
    subject: `Reservation received for ${details.reservation_date}`,
    text: [
      `Hi ${details.full_name.trim()},`,
      '',
      `We received your reservation request.`,
      `Date: ${details.reservation_date}`,
      `Time: ${details.reservation_time}`,
      `Guests: ${details.guests}`,
      `Special requests: ${details.special_requests?.trim() || 'None'}`,
      '',
      `We will contact you shortly to confirm.`,
      '',
      `Sammy's Grill`,
    ].join('\n'),
    html: `
      <div style="margin:0; padding:24px; background:#f3efe9; font-family:Arial, Helvetica, sans-serif; color:#f5f0e8;">
        <div style="max-width:680px; margin:0 auto; background:#1b1b1b; border-radius:18px; overflow:hidden; border:1px solid #2e2e2e;">
          <div style="padding:40px 32px 28px; text-align:center; background:linear-gradient(180deg, #26201d 0%, #1b1b1b 100%);">
            <div style="font-size:22px; letter-spacing:3px; font-weight:800; color:#f05a24; text-transform:uppercase;">
              Sammy's Grill
            </div>
            <div style="margin-top:12px; font-size:28px; font-weight:700; color:#f5f0e8;">
              Your Table Is Ready
            </div>
            <div style="margin-top:10px; font-size:15px; color:#d4a853;">
              Reservation request received successfully
            </div>
          </div>

          <div style="height:3px; background:#f05a24;"></div>

          <div style="padding:32px;">
            <p style="margin:0 0 16px; font-size:28px; font-weight:700; color:#ffffff;">
              Hi ${details.full_name.trim()},
            </p>

            <p style="margin:0 0 24px; font-size:17px; line-height:1.8; color:#d7d2cb;">
              We are thrilled to confirm that we received your reservation request at Sammy's Grill.
              Our team will have everything ready for your visit and will contact you shortly if anything needs confirmation.
            </p>

            <div style="background:#2b2b2b; border-radius:16px; padding:24px; border-left:5px solid #f05a24; margin-bottom:24px;">
              <div style="margin-bottom:14px; font-size:16px; color:#b8b2aa;">
                <strong style="display:inline-block; min-width:90px; color:#b8b2aa;">Date:</strong>
                <span style="font-size:28px; font-weight:800; color:#ffffff;">${details.reservation_date}</span>
              </div>
              <div style="margin-bottom:14px; font-size:16px; color:#b8b2aa;">
                <strong style="display:inline-block; min-width:90px; color:#b8b2aa;">Time:</strong>
                <span style="font-size:28px; font-weight:800; color:#ffffff;">${details.reservation_time}</span>
              </div>
              <div style="margin-bottom:14px; font-size:16px; color:#b8b2aa;">
                <strong style="display:inline-block; min-width:90px; color:#b8b2aa;">Guests:</strong>
                <span style="font-size:28px; font-weight:800; color:#ffffff;">${details.guests} ${details.guests === 1 ? 'Person' : 'People'}</span>
              </div>
              <div style="font-size:16px; color:#b8b2aa;">
                <strong style="display:block; margin-bottom:8px; color:#b8b2aa;">Requests:</strong>
                <span style="font-size:24px; font-weight:700; color:#f05a24;">
                  ${details.special_requests?.trim() || 'None'}
                </span>
              </div>
            </div>

            <p style="margin:0 0 12px; font-size:15px; line-height:1.7; color:#d7d2cb;">
              Need to update anything? Reply to this email and our team will help you out.
            </p>
            <p style="margin:0; font-size:15px; line-height:1.7; color:#d7d2cb;">
              Sammy's Grill<br />
              Kanakapura, Bangalore
            </p>
          </div>
        </div>
      </div>
    `,
  })
}
