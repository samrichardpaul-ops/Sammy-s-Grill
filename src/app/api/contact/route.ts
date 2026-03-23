import { NextResponse } from 'next/server'
import { getServerClient } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    const errs: string[] = []
    if (!name?.trim())    errs.push('Name is required')
    if (!email?.trim() || !/\S+@\S+\.\S+/.test(email)) errs.push('Valid email is required')
    if (!subject?.trim()) errs.push('Subject is required')
    if (!message?.trim()) errs.push('Message is required')
    if (errs.length) return NextResponse.json({ errors: errs }, { status: 400 })

    const supabase = getServerClient()
    const { error } = await supabase
      .from('contacts')
      .insert({ name: name.trim(), email: email.trim().toLowerCase(), subject: subject.trim(), message: message.trim() })

    if (error) throw error
    return NextResponse.json({ contact: "success" }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/contact]', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
