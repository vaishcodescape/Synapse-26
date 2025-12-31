import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = (await createClient()) as any;
        const { id: userId } = await params;

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("users")
            .select(
                `
            user_id,
            user_name,
            email,
            phone,
            college,
            registration_date,
            team_members (
            team (
            event_registrations (
            event_fee (
            event (
            event_name
            )))))
            `
            )
            .eq("user_id", userId)
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const events: string[] = [];

        data.team_members?.forEach((tm: any) => {
            const eventName =
                tm.team?.event_registrations?.event_fee?.event?.event_name;

            if (eventName) {
                events.push(eventName);
            }
        });

        return NextResponse.json({
            user_name: data.user_name,
            email: data.email,
            phone: data.phone,
            college: data.college,
            registration_date: data.registration_date,
            event_count: events.length,
            events,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
