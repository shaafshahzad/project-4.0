"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";

interface GoogleCalendarEventItem {
	summary: string;
	start: {
		dateTime?: string;
		date?: string;
	};
	end: {
		dateTime?: string;
		date?: string;
	};
}

const Calendar = () => {
	const [events, setEvents] = useState([]);
	const router = useRouter();
	const user = useAuth(router);
	const accessToken = user?.googleAccessToken;

	useEffect(() => {
		const fetchEvents = async () => {
			const headers = new Headers();
			console.log(accessToken);
			headers.append("Authorization", `Bearer ${accessToken}`);

			const response = await fetch(
				"https://www.googleapis.com/calendar/v3/calendars/primary/events",
				{
					headers: headers,
				}
			);

			if (!response.ok) {
				console.error("Error fetching calendar events");
				return;
			}

			const data = await response.json();
			const fetchedEvents = data.items.map(
				(item: GoogleCalendarEventItem) => ({
					title: item.summary,
					start: item.start.dateTime || item.start.date,
					end: item.end.dateTime || item.end.date,
				})
			);

			setEvents(fetchedEvents);
		};

		if (accessToken) {
			fetchEvents();
		}
	}, [accessToken]);

	return (
		<div>
			<FullCalendar
				plugins={[dayGridPlugin, googleCalendarPlugin]}
				initialView="dayGridMonth"
				events={events} // Pass the events state to FullCalendar
			/>
		</div>
	);
};

export default Calendar;
