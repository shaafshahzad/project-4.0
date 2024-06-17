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

  let currentTime = new Date(timeMin);
  const now = new Date();
  if (currentTime < now) {
    currentTime = new Date(now.getTime() + 60 * 60 * 1000);
  }
  currentTime.setHours(
    Math.max(currentTime.getHours(), workingHoursStart),
    0,
    0,
    0
  );

  let occupiedSlots = events
    .map((event) => ({
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
    }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  occupiedSlots = occupiedSlots.filter(
    (slot) =>
      (slot.start.getHours() < workingHoursEnd &&
        slot.end.getHours() > workingHoursStart) ||
      (slot.start.getHours() < workingHoursEnd &&
        slot.end.getHours() >= workingHoursEnd)
  );

  let availableSlots: { start: Date; end: Date }[] = [];

  while (currentTime < timeMax) {
    let endOfDay = new Date(currentTime);
    endOfDay.setHours(workingHoursEnd, 0, 0, 0);

    let daySlots = occupiedSlots.filter(
      (slot) => slot.start >= currentTime && slot.start < endOfDay
    );

    if (daySlots.length === 0) {
      if (currentTime < endOfDay) {
        availableSlots.push({
          start: new Date(currentTime),
          end: new Date(endOfDay),
        });
      }
      currentTime.setDate(currentTime.getDate() + 1);
      currentTime.setHours(workingHoursStart, 0, 0, 0);
      continue;
    }

    for (const slot of daySlots) {
      if (currentTime < slot.start) {
        availableSlots.push({
          start: new Date(currentTime),
          end: new Date(slot.start),
        });
      }
      currentTime = new Date(slot.end);

      if (currentTime.getHours() >= workingHoursEnd) {
        currentTime.setDate(currentTime.getDate() + 1);
        currentTime.setHours(workingHoursStart, 0, 0, 0);
        break;
      }
    }

    if (currentTime < endOfDay) {
      availableSlots.push({
        start: new Date(currentTime),
        end: new Date(endOfDay),
      });
    }
    currentTime.setDate(currentTime.getDate() + 1);
    currentTime.setHours(workingHoursStart, 0, 0, 0);
  }

  return availableSlots;
}

export function allocateTaskTime(
  availableSlots: { start: Date; end: Date }[],
  duration: number, // duration in minutes
  dueDate: Date
): { start: Date; end: Date }[] {
  const today = new Date();
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const dailyDuration = Math.ceil(duration / daysUntilDue); // minutes per day
  let allocatedSlots: { start: Date; end: Date }[] = [];
  let remainingDuration = duration;

  for (const slot of availableSlots) {
    if (remainingDuration <= 0) break;

    const slotStartDay = slot.start.getDate();
    const slotEndDay = slot.end.getDate();

    if (slotStartDay !== slotEndDay) {
      const slotEndOfDay = new Date(slot.start);
      slotEndOfDay.setHours(23, 59, 59, 999);
      const slotStartOfNextDay = new Date(slot.end);
      slotStartOfNextDay.setHours(0, 0, 0, 0);

      const slotStartDayDuration =
        (slotEndOfDay.getTime() - slot.start.getTime()) / 60000;
      const slotEndDayDuration =
        (slot.end.getTime() - slotStartOfNextDay.getTime()) / 60000;

      if (slotStartDayDuration > 0) {
        const durationToAllocate = Math.min(
          dailyDuration,
          remainingDuration,
          slotStartDayDuration
        );
        allocatedSlots.push({
          start: new Date(slot.start),
          end: new Date(slot.start.getTime() + durationToAllocate * 60000),
        });
        remainingDuration -= durationToAllocate;
      }

      if (slotEndDayDuration > 0 && remainingDuration > 0) {
        const durationToAllocate = Math.min(
          dailyDuration,
          remainingDuration,
          slotEndDayDuration
        );
        allocatedSlots.push({
          start: new Date(slot.end.getTime() - slotEndDayDuration * 60000),
          end: new Date(slot.end),
        });
        remainingDuration -= durationToAllocate;
      }
    } else {
      const slotDuration = (slot.end.getTime() - slot.start.getTime()) / 60000;
      const durationToAllocate = Math.min(
        dailyDuration,
        remainingDuration,
        slotDuration
      );

      if (durationToAllocate > 0) {
        allocatedSlots.push({
          start: new Date(slot.start),
          end: new Date(slot.start.getTime() + durationToAllocate * 60000),
        });
        remainingDuration -= durationToAllocate;
      }
    }
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
