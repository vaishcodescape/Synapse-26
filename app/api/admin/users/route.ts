import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const supabase = (await createClient()) as any;
        const { searchParams } = new URL(req.url);

        const page = Number(searchParams.get("page") ?? 1);
        const limit = Number(searchParams.get("limit") ?? 10);
        const search = searchParams.get("searchParams") ?? "";
        const eventName = searchParams.get("filter") ?? "";

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const hasEventFilter = Boolean(eventName);

        let query = supabase.from("users").select(
        `
        user_id,
        user_name,
        email,
        phone,
        college,
        registration_date,
        team_members${hasEventFilter ? "!inner" : ""} (
        team${hasEventFilter ? "!inner" : ""} (
        event_registrations${hasEventFilter ? "!inner" : ""} (
        registration_id,
        event_fee${hasEventFilter ? "!inner" : ""} (
        event${hasEventFilter ? "!inner" : ""} (
        event_name
        )))))
        `,
            { count: "exact" }
        );

        if (search.trim() !== "") {
            query = query.or(
                `user_name.ilike.%${search}%,email.ilike.%${search}%,college.ilike.%${search}%`
            );
        }

        if (eventName) {
            query = query.eq(
                "team_members.team.event_registrations.event_fee.event.event_name",
                eventName
            );
        }

        const { data, error, count } = await query.range(from, to);

        if (error) {
            console.error(error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const users =
            data?.map((user: any) => {
                let eventCount = 0;

                user.team_members?.forEach((tm: any) => {
                    if (tm.team?.event_registrations) {
                        eventCount += 1;
                    }
                });

                return {
                    user_id: user.user_id,
                    user_name: user.user_name,
                    email: user.email,
                    phone: user.phone,
                    college: user.college,
                    registration_date: user.registration_date,
                    event_count: eventCount,
                };
            }) ?? [];

        return NextResponse.json({
            total: count ?? 0,
            page,
            limit,
            users
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
