import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  try {
    const body = await request.json()
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      event_id, 
      fee_id, 
      user_id // The ID of the user who paid
    } = body

    // 1. Verify Signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex')

    if (generated_signature !== razorpay_signature) {
      // Optional: You could record a 'failed' entry here if you wanted
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // 2. Get Fee Details (Price)
    const { data: feeData } = await supabase
      .from('fee')
      .select('price')
      .eq('fee_id', fee_id)
      .single()

    if (!feeData) throw new Error('Fee not found')

    // 3. Insert Registration (Transaction)
    const { data: regData, error: regError } = await supabase
      .from('event_registrations')
      .insert({
        event_id,
        fee_id,
        registered_by_user_id: user_id, 
        gross_amount: feeData.price,
        razorpay_order_id,
        razorpay_payment_id,
        payment_status: 'done' 
      })
      .select('registration_id')
      .single()

    if (regError) throw regError

    // 4. Create Team & Add User (Required by your schema)
    const registrationId = regData.registration_id

    // A. Create the Team Entry
    const { data: teamData, error: teamError } = await supabase
      .from('team')
      .insert({ registration_id: registrationId })
      .select('team_id')
      .single()

    if (teamError) throw teamError

    // B. Add the Payer as the First Member
    const { error: memberError } = await supabase
      .from('team_members')
      .insert({
        team_id: teamData.team_id,
        user_id: user_id
      })

    if (memberError) throw memberError

    return NextResponse.json({ success: true, teamId: teamData.team_id })

  } catch (error: any) {
    console.error('Payment Verification Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}