import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: 'Razorpay credentials not configured' }, { status: 500 })
  }
  const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET })

  try {
    const { event_id, fee_id, user_id } = await request.json()

    // 1. SECURITY: Verify Fee belongs to Event & Get Price
    // We join 'event_fee' with 'fee' to get the price safely
    const { data: validLink, error } = await supabase
      .from('event_fee')
      .select('fee ( price )')
      .eq('event_id', event_id)
      .eq('fee_id', fee_id)
      .single()

    if (error || !validLink || !validLink.fee) {
      return NextResponse.json({ error: 'Invalid Fee/Event combination' }, { status: 400 })
    }

    // @ts-ignore (Supabase types can be tricky with joins, trusting the query)
    const price = validLink.fee.price

    // 2. Create Razorpay Order
    const amountInPaise = price * 100
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${user_id.slice(0, 5)}_${Date.now()}`, // Shorten UUID for receipt
    })

    return NextResponse.json({ 
      orderId: order.id, 
      amount: amountInPaise, 
      currency: 'INR' 
    })

  } catch (error: any) {
    console.error('Order Create Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}