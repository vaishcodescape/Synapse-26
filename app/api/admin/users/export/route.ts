import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = (await createClient()) as any;
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("searchParams") ?? "";
    const eventName = searchParams.get("filter") ?? "";
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
        event_fee${hasEventFilter ? "!inner" : ""} (
        event${hasEventFilter ? "!inner" : ""} (
        event_name
        )))))
        `
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

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const headers = [
      "User ID",
      "User Name",
      "Email",
      "Phone",
      "College",
      "Registration Date",
      "Event Count",
    ];

    const csvRows = [
      headers.join(","),
      ...(data ?? []).map((user: any) => {
        let eventCount = 0;

        user.team_members?.forEach((tm: any) => {
          if (tm.team?.event_registrations) {
            eventCount += 1;
          }
        });

        return [
          user.user_id,
          `"${user.user_name}"`,
          user.email,
          user.phone,
          `"${user.college}"`,
          user.registration_date,
          eventCount,
        ].join(",");
      }),
    ];

    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="users.csv"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
