import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const supabase = (await createClient()) as any;
        const { searchParams } = new URL(req.url);

        const page = Number(searchParams.get("page") ?? 1);
        const limit = Number(searchParams.get("limit") ?? 10);
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const search = searchParams.get("searchParams") ?? ""; //name,email,college,transactionId
        const eventFilter = searchParams.get("filter");
        const paymentMethod = searchParams.get("paymentMethod");
        const paymentStatus = searchParams.get("paymentStatus");

        const buildQuery = () => {
            let q = supabase.from("event_registrations").select(
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
                `,
                { count: "exact" }
            );

            if (search.trim()) {
                q = q.or(
                    `
                    transaction_id.ilike.%${search}%,
                    users.user_name.ilike.%${search}%,
                    users.email.ilike.%${search}%,
                    users.college.ilike.%${search}%
                `
                );
            }

            if (eventFilter) {
                q = q.eq("event_fee.event.event_name", eventFilter);
            }

            if (paymentMethod) {
                q = q.eq("payment_method.method_name", paymentMethod);
            }

            if (paymentStatus) {
                q = q.eq("payment_status", paymentStatus);
            }

            return q;
        };

        const { data, error, count } = await buildQuery().range(from, to);
        
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        
        let totalRegistrations = data?.length ?? 0;
        let paid = 0;
        let grossRevenue = 0;
        let gatewayCharges = 0;
        let netRevenue = 0;

        data?.forEach((row: any) => {
            const price = row.event_fee?.fee?.price ?? 0;
            const gateway = row.payment_method?.gateway_charge ?? 0;

            if (row.payment_status === "done") {
                paid += 1;
                grossRevenue += price;
                gatewayCharges += gateway;
                netRevenue += price - gateway;
            }
        });

        const rows =
            data?.map((row: any) => {
                const price = row.event_fee?.fee?.price ?? 0;
                const gateway = row.payment_method?.gateway_charge ?? 0;
                const groupSize = row.team?.team_members?.length ?? 1;

                return {
                    registration_id: row?.registration_id,
                    transaction_id: row?.transaction_id,
                    user_name: row.users?.user_name,
                    college: row.users?.college,
                    event_name: row.event_fee?.event?.event_name,
                    category:
                        row.event_fee?.event?.event_category?.category_name,
                    participation_type: row.event_fee?.fee?.participation_type,
                    payment_method: row.payment_method?.method_name,
                    group_size: groupSize,
                    payment_status: row.payment_status,
                    gross_amount: price,
                    gateway_charge: gateway,
                    net_amount: price - gateway,
                };
            }) ?? [];

        return NextResponse.json({
            page,
            limit,
            total: count ?? 0,
            summary: {
                total_registrations: totalRegistrations,
                paid,
                gross_revenue: grossRevenue,
                gateway_charges: gatewayCharges,
                net_revenue: netRevenue,
            },
            data: rows,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
