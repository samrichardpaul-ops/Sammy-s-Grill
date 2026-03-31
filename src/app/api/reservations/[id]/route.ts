import { NextResponse } from 'next/server'
import { getServerClient } from '@/lib/supabase'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const supabase = getServerClient()

    const { error } = await supabase.from('reservations').delete().eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[DELETE /api/reservations/[id]]', err)
    return NextResponse.json(
      { error: 'Failed to delete reservation' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const supabase = getServerClient()

    const { error } = await supabase
      .from('reservations')
      .update(body)
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[PATCH /api/reservations/[id]]', err)
    return NextResponse.json(
      { error: 'Failed to update reservation' },
      { status: 500 }
    )
  }
}
