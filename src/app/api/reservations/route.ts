import { NextResponse } from 'next/server'
import { getServerClient } from '@/lib/supabase'
import { sendOwnerReservationEmail } from '@/lib/mail'

// GET /api/reservations — admin: list + search + filter
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q      = searchParams.get('q')      ?? ''
    const date   = searchParams.get('date')   ?? ''
    const status = searchParams.get('status') ?? ''

    const supabase = getServerClient()
    let query = supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false })

    if (q)      query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`)
    if (date)   query = query.eq('reservation_date', date)
    if (status) query = query.eq('status', status)

    const { data, error } = await query
    if (error) throw error
    return NextResponse.json({ reservations: data }, { status: 200 })
  } catch (err) {
    console.error('[GET /api/reservations]', err)
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 })
  }
}

// POST /api/reservations — public: book a table
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { full_name, email, phone, reservation_date, reservation_time, guests, special_requests } = body

    // Validation
    const errs: string[] = []
    if (!full_name?.trim())        errs.push('Full name is required')
    if (!email?.trim())            errs.push('Email is required')
    if (!/\S+@\S+\.\S+/.test(email)) errs.push('Valid email is required')
    if (!phone?.trim())            errs.push('Phone number is required')
    if (!reservation_date)         errs.push('Reservation date is required')
    if (!reservation_time)         errs.push('Reservation time is required')
    if (!guests || guests < 1 || guests > 20) errs.push('Guests must be between 1 and 20')

    // Must not be in the past
    if (reservation_date) {
      const today = new Date(); today.setHours(0,0,0,0)
      if (new Date(reservation_date) < today) errs.push('Reservation date cannot be in the past')
    }

    if (errs.length) return NextResponse.json({ errors: errs }, { status: 400 })

    const payload = {
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      reservation_date,
      reservation_time,
      guests: Number(guests),
      special_requests: special_requests?.trim() || null,
    }

    let databaseSaved = false
    try {
      const supabase = getServerClient()
      const { error } = await supabase
        .from('reservations')
        .insert(payload)

      if (error) {
        console.error('[POST /api/reservations] Supabase save failed', error)
      } else {
        databaseSaved = true
      }
    } catch (dbError) {
      console.error('[POST /api/reservations] Supabase exception', dbError)
    }

    await sendOwnerReservationEmail(payload)

    return NextResponse.json({ reservation: 'success', databaseSaved }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/reservations]', err)
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 })
  }
}
