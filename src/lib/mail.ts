import { Resend } from 'resend';

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
  const { RESEND_API_KEY, SMTP_EMAIL } = process.env;

  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not found in environment variables. Email will not be sent.");
    return;
  }

  const resend = new Resend(RESEND_API_KEY);
  
  // NOTE: If you have a custom domain in Vercel (e.g. sammys-grill.com), verify it in Resend!
  // Then replace 'onboarding@resend.dev' with 'reservations@sammys-grill.com'
  const FROM_ADDRESS = "Sammy's Grill <onboarding@resend.dev>"; 
  const OWNER_EMAIL = SMTP_EMAIL || "samrichardpaul@gmail.com";

  try {
    // 1. Send to Customer
    console.log(`Sending Resend email to CUSTOMER: ${to}`);
    const { data: customerData, error: customerError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [to],
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
          
          <!-- Footer -->
          <div style="background-color: #111111; padding: 25px; text-align: center;">
            <p style="color: #666666; margin: 0; font-size: 14px;">
              Sammy's Grill • The Best Steaks in Town
            </p>
          </div>
        </div>
      `,
    });

    if (customerError) {
      console.error("Resend Customer Delivery Error:", customerError);
    } else {
      console.log(`Successfully sent to Customer:`, customerData);
    }
    
    // 2. Send purely Notification to Owner
    console.log(`Sending Resend notification to OWNER: ${OWNER_EMAIL}`);
    const { data: ownerData, error: ownerError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [OWNER_EMAIL],
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
    });

    if (ownerError) {
      console.error("Resend Owner Delivery Error:", ownerError);
    }
  } catch (error) {
    console.error("Critical Resend Error:", error);
  }
}
