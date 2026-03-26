import nodemailer from 'nodemailer';

export async function sendReservationEmail(
  to: string,
  details: {
    full_name: string;
    phone?: string;
    reservation_date: string;
    reservation_time: string;
    guests: number;
    special_requests?: string | null;
  }
) {
  try {
    console.log("Sending Formspree POST request...");
    const response = await fetch("https://formspree.io/f/mbdpljqo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: to,
        _replyto: to,
        fullname: details.full_name,
        phone: details.phone || "Not provided",
        date: details.reservation_date,
        timeslot: details.reservation_time,
        guests: details.guests,
        specialrequests: details.special_requests || "None",
        _subject: "New Reservation - Sammy's Grill"
      }),
    });

    if (response.ok) {
      console.log("✅ Successfully sent reservation to Formspree!");
    } else {
      const errorText = await response.text();
      console.error("❌ Formspree Error:", errorText);
      throw new Error("Formspree rejected the request");
    }
  } catch (error: any) {
    console.error("❌ Failed to trigger Formspree:", error);
    throw error;
  }
}
