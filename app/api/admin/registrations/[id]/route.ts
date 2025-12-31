import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = (await createClient()) as any
    const { id: registrationId } = await params;

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("event_registrations")
      .select(
        `
        transaction_id,
        registration_id,
        payment_status,
        
        users (
          user_name,
          email,
          phone,
          college
        ),
        team (
          team_members ( user_id )
        ),
        event_fee (
          event (
            event_name,
            event_category ( category_name )
          ),
          fee (
            participation_type,
            price
          )
        ),
        payment_method (
          method_name,
          gateway_charge
        )
        `
      )
      .eq("registration_id", registrationId)
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const price = data.event_fee?.fee?.price ?? 0;
    const gateway = data.payment_method?.gateway_charge ?? 0;
    const teamSize = data.team?.team_members?.length ?? 1;

    return NextResponse.json({
      user: {
        name: data.users?.user_name,
        email: data.users?.email,
        phone: data.users?.phone,
        college: data.users?.college
      },
      event: {
        event_name: data.event_fee?.event?.event_name,
        category: data.event_fee?.event?.event_category?.category_name,
        participation_type: data.event_fee?.fee?.participation_type,
        team_size: teamSize,
        registration_date: data.created_at
      },
      payment: {
        method: data.payment_method?.method_name,
        status: data.payment_status,
      },
      financials: {
        transaction_id: data.transaction_id,
        gross_amount: price,
        gateway_charge: gateway,
        net_amount: price - gateway
      }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
