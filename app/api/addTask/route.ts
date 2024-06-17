import { NextRequest, NextResponse } from "next/server";
import {
  allocateTaskTime,
  createCalendarEvent,
  fetchCalendarEvents,
  findAvailableSlots,
} from "@/lib/utils/scheduling";

export async function POST(req: NextRequest) {
  const accessToken = req.headers.get("Authorization");
  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token provided" },
      { status: 401 }
    );
  }

  const values = await req.json();
  const dueDate = new Date(values.date);
  const duration = values.hours * 60;
  const timeMin = new Date().toISOString();
  const timeMax = dueDate.toISOString();

  const events = await fetchCalendarEvents(accessToken, timeMin, timeMax);
  let availableSlots = [];

  if (events && events.items) {
    availableSlots = findAvailableSlots(
      events.items,
      new Date(timeMin),
      dueDate
    );
    try {
      const allocatedSlots = allocateTaskTime(
        availableSlots,
        duration,
        dueDate
      );

      for (const slot of allocatedSlots) {
        await createCalendarEvent(
          accessToken,
          slot.start,
          slot.end,
          values.taskName
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return NextResponse.json(events);
}
