export async function sendReservationEmail(
  to: string,
  details: {
    full_name: string
    phone?: string
    reservation_date: string
    reservation_time: string
    guests: number
    special_requests?: string | null
  }
) {
  try {
    console.log('Sending Formspree POST request...')

    const payload = new URLSearchParams({
      email: to.trim(),
      _replyto: to.trim(),
      fullname: details.full_name.trim(),
      phone: details.phone?.trim() || 'Not provided',
      date: details.reservation_date,
      timeslot: details.reservation_time,
      guests: String(details.guests),
      specialrequests: details.special_requests?.trim() || 'None',
      _subject: "New Reservation - Sammy's Grill",
    })

    const response = await fetch('https://formspree.io/f/mbdpljqo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: payload.toString(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Formspree Error:', errorText)
      throw new Error('Formspree rejected the request')
    }

    console.log('Successfully sent reservation to Formspree.')
  } catch (error) {
    console.error('Failed to trigger Formspree:', error)
    throw error
  }
}
