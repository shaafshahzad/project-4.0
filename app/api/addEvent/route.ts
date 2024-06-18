import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const accessToken = req.headers.get("Authorization");
  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token provided" },
      { status: 401 }
    );
  }

  const values = await req.json();
  const calendarId = "primary";
  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
  );

  const event = {
    summary: values.eventName,
    start: {
      dateTime: values.startDate,
      timeZone: "UTC",
    },
    end: {
      dateTime: values.endDate,
      timeZone: "UTC",
    },
    description: values.description,
  };

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error("Failed to add event");
  }

  const eventData = await response.json();

  return NextResponse.json({ "Event added": eventData });
}
