import { NextRequest, NextResponse } from "next/server";
import {
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
	const timeMin = new Date().toISOString();
	console.log(timeMin);
	const timeMax = dueDate.toISOString();

	const events = await fetchCalendarEvents(accessToken, timeMin, timeMax);
	let availableSlots = [];

	if (events && events.items) {
		availableSlots = findAvailableSlots(
			events.items,
			new Date(timeMin),
			dueDate
		);
		console.log(availableSlots);
	}

	return NextResponse.json(events);
}
