import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function checkAdmin(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return false

  const allowedAdmins = ['admin@yourcollege.edu', 'organizer@gmail.com']
  if (!allowedAdmins.includes(user.email || '')) {
    return false
  }

  return true
}

export async function GET() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any

  if (!await checkAdmin(supabase)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('event')
    .select(`
      *,
      event_category ( category_name ),
      event_fee (
        fee ( price, participation_type )
      )
    `)
    .order('event_date', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ events: data })
}

export async function POST(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any

  if (!await checkAdmin(supabase)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const body = await request.json()

    if (!body.event_name || !body.event_date || !body.category_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('event')
      .insert({
        event_name: body.event_name,
        category_id: body.category_id,
        event_date: body.event_date, // Ensure format is ISO string (e.g. 2025-01-18T10:00:00Z)
        event_picture: body.event_picture,
        rulebook: body.rulebook,
        description: body.description,
        is_registration_open: body.is_registration_open ?? true
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, event: data }, { status: 201 })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}