import { createClient } from '@/utils/supabase/server'
import { NextRequest,NextResponse } from 'next/server'

export async function GET(request:NextRequest) {
    try {
        const supabase = await createClient() as any
        
        const { data, error } = await supabase
        .from('payment_method')
        .select(`*`)
    
        return NextResponse.json({  data: data })
    } catch (error:any) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(request:NextRequest) {
    try {
        const supabase = await createClient() as any
        const body = await request.json()

        const { data, error } = await supabase
        .from('payment_method')
        .upsert(body)
        .select(`*`)
    
        return NextResponse.json({  data: data }, { status: 200 })

    } catch (error:any) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}