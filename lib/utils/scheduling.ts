interface TimeSlot {
	start: Date;
	end: Date;
}

interface TaskBlock {
	start: Date;
	end: Date;
	taskName: string;
}

export async function fetchCalendarEvents(
	accessToken: string,
	timeMin: string,
	timeMax: string
) {
	const calendarId = "shaaf.m.shahzad@gmail.com"; //TODO: change to user email address/calendar id
	const url = new URL(
		`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
	);

	url.searchParams.append("timeMin", timeMin);
	url.searchParams.append("timeMax", timeMax);
	url.searchParams.append("singleEvents", "true");

	const response = await fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const events = await response.json();
	return events;
}

export function findAvailableSlots(
	events: any[],
	timeMin: Date,
	timeMax: Date
): { start: Date; end: Date }[] {
	const workingHoursStart = 10;
	const workingHoursEnd = 22;
	let occupiedSlots = events
		.map((event) => ({
			start: new Date(event.start.dateTime || event.start.date),
			end: new Date(event.end.dateTime || event.end.date),
		}))
		.sort((a, b) => a.start.getTime() - b.start.getTime());

	occupiedSlots = occupiedSlots.filter(
		(slot) =>
			slot.start.getHours() < workingHoursEnd &&
			slot.end.getHours() > workingHoursStart
	);

	let availableSlots: { start: Date; end: Date }[] = [];
	let currentTime = new Date(timeMin.setHours(workingHoursStart, 0, 0, 0));

	for (const slot of occupiedSlots) {
		if (currentTime < slot.start) {
			let endTime = slot.start;
			if (endTime.getHours() >= workingHoursEnd) {
				endTime = new Date(endTime.setHours(workingHoursEnd, 0, 0, 0));
			}
			if (currentTime.getHours() < workingHoursEnd) {
				availableSlots.push({
					start: new Date(currentTime),
					end: new Date(endTime),
				});
			}
		}
		currentTime = new Date(
			Math.max(currentTime.getTime(), slot.end.getTime())
		);

		if (currentTime.getHours() >= workingHoursEnd) {
			currentTime.setDate(currentTime.getDate() + 1);
			currentTime.setHours(workingHoursStart, 0, 0, 0);
		}
	}

	if (currentTime.getHours() < workingHoursEnd) {
		const lastSlotEndTime = new Date(currentTime);
		lastSlotEndTime.setHours(workingHoursEnd, 0, 0, 0);
		if (lastSlotEndTime.getTime() <= timeMax.getTime()) {
			availableSlots.push({
				start: new Date(currentTime),
				end: lastSlotEndTime,
			});
		}
	}

	return availableSlots;
}
