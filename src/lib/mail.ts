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
  try {
    const response = await fetch("https://formspree.io/f/mbdpljqo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: to,
        subject: `New Reservation from ${details.full_name}`,
        Name: details.full_name,
        Date: details.reservation_date,
        Time: details.reservation_time,
        Guests: details.guests,
        Special_Requests: details.special_requests || "None",
      }),
    });

    if (response.ok) {
      console.log("Successfully sent reservation to Formspree!");
    } else {
      console.error("Failed to send to Formspree:", await response.text());
    }
  } catch (error) {
    console.error("Error sending to Formspree:", error);
  }
}
