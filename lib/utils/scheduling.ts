export async function fetchCalendarEvents(
  accessToken: string,
  timeMin: string,
  timeMax: string
) {
  const calendarId = "primary";
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
  const workingHoursStart = 10; // 10 AM
  const workingHoursEnd = 22; // 10 PM

  let currentTime = new Date(Math.max(timeMin.getTime(), Date.now()));
  currentTime.setHours(workingHoursStart, 0, 0, 0);

  let occupiedSlots = events
    .map((event) => ({
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
    }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  let availableSlots: { start: Date; end: Date }[] = [];

  while (currentTime < timeMax) {
    let endOfDay = new Date(currentTime);
    endOfDay.setHours(workingHoursEnd, 0, 0, 0);

    let daySlots = occupiedSlots.filter(
      (slot) => slot.end > currentTime && slot.start < endOfDay
    );

    if (daySlots.length === 0) {
      availableSlots.push({
        start: new Date(currentTime),
        end: new Date(endOfDay),
      });
    } else {
      let slotStart = new Date(currentTime);
      for (const slot of daySlots) {
        if (slotStart < slot.start) {
          availableSlots.push({
            start: new Date(slotStart),
            end: new Date(slot.start),
          });
        }
        slotStart = new Date(Math.max(slotStart.getTime(), slot.end.getTime()));
      }
      if (slotStart < endOfDay) {
        availableSlots.push({
          start: new Date(slotStart),
          end: new Date(endOfDay),
        });
      }
    }

    currentTime.setDate(currentTime.getDate() + 1);
    currentTime.setHours(workingHoursStart, 0, 0, 0);
  }

  const minimumSlotDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
  availableSlots = availableSlots.filter(
    (slot) => slot.end.getTime() - slot.start.getTime() >= minimumSlotDuration
  );

  return availableSlots;
}

export function allocateTaskTime(
  availableSlots: { start: Date; end: Date }[],
  duration: number, // duration in minutes
  dueDate: Date
): { start: Date; end: Date }[] {
  let allocatedSlots: { start: Date; end: Date }[] = [];
  let remainingDuration = duration;

  for (const slot of availableSlots) {
    if (remainingDuration <= 0 || slot.start >= dueDate) break;

    const slotDuration = (slot.end.getTime() - slot.start.getTime()) / 60000; // Convert to minutes
    const allocatedDuration = Math.min(remainingDuration, slotDuration);

    if (allocatedDuration > 0) {
      allocatedSlots.push({
        start: new Date(slot.start),
        end: new Date(slot.start.getTime() + allocatedDuration * 60000),
      });
      remainingDuration -= allocatedDuration;
    }

    if (remainingDuration <= 0) break;
  }

  return allocatedSlots;
}

export async function createCalendarEvent(
  accessToken: string,
  start: Date,
  end: Date,
  summary: string
) {
  const calendarId = "primary";
  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
  );

  const event = {
    summary: summary,
    start: {
      dateTime: start.toISOString(),
      timeZone: "UTC",
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: "UTC",
    },
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
    throw new Error("Failed to create calendar event");
  }

  const eventData = await response.json();
  return eventData;
}
