import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = (await createClient()) as any;
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("searchParams") ?? "";
    const eventFilter = searchParams.get("filter");
    const paymentMethod = searchParams.get("paymentMethod");
    const paymentStatus = searchParams.get("paymentStatus");
    
    let query = supabase.from("event_registrations").select(
      `
      transaction_id,
      registration_id,
      payment_status,
      team (
        team_members ( user_id )
      ),
      users(user_name,email,college),
      event_fee(
        event(event_name,event_category(category_name)),
        fee(participation_type,price)
      ),
      payment_method(method_name,gateway_charge)
      `
    );
    
    if (search.trim()) {
      query = query.or(
        `
        transaction_id.ilike.%${search}%,
        users.user_name.ilike.%${search}%,
        users.email.ilike.%${search}%,
        users.college.ilike.%${search}%
        `
      );
    }

    if (eventFilter) {
      query = query.eq("event_fee.event.event_name", eventFilter);
    }

    if (paymentMethod) {
      query = query.eq("payment_method.method_name", paymentMethod);
    }

    if (paymentStatus) {
      query = query.eq("payment_status", paymentStatus);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    const headers = [
      "Registration ID",
      "Transaction ID",
      "User Name",
      "Email",
      "College",
      "Event Name",
      "Category",
      "Participation Type",
      "Group Size",
      "Payment Method",
      "Payment Status",
      "Gross Amount",
      "Gateway Charge",
      "Net Amount"
    ];

    const csvRows = [
      headers.join(","),
      ...(data ?? []).map((row: any) => {
        const price = row.event_fee?.fee?.price ?? 0;
        const gateway = row.payment_method?.gateway_charge ?? 0;
        const groupSize = row.team?.team_members?.length ?? 1;

        return [
          row.registration_id,
          row.transaction_id,
          `"${row.users?.user_name}"`,
          row.users?.email,
          `"${row.users?.college}"`,
          `"${row.event_fee?.event?.event_name}"`,
          `"${row.event_fee?.event?.event_category?.category_name}"`,
          row.event_fee?.fee?.participation_type,
          groupSize,
          row.payment_method?.method_name,
          row.payment_status,
          price,
          gateway,
          price - gateway
        ].join(",");
      })
    ];

    const csv = csvRows.join("\n");
    
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="registrations.csv"`
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
