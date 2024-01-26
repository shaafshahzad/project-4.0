"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";

const Calendar = () => {
	const currentDate = new Date();

	const startOfWeek = new Date(
		currentDate.setDate(currentDate.getDate() - currentDate.getDay())
	);

	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 6);

	const dateFormatter = new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
	});
	const startOfWeekFormatted = dateFormatter.format(startOfWeek);
	const endOfWeekFormatted = dateFormatter.format(endOfWeek);

	const title = `Week of ${startOfWeekFormatted} - ${endOfWeekFormatted}`;

	return (
		<Card className="flex flex-col col-span-3 col-start-3">
			<CardHeader className="">
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<FullCalendar
					plugins={[timeGridPlugin]}
					initialView="timeGridWeek"
					themeSystem="united"
					height="30vh"
					events={[
						{ title: "event 1", date: "2024-01-28" },
						{ title: "event 2", date: "2024-01-29" },
					]}
					headerToolbar={{
						left: "",
						center: "",
						right: "",
					}}
				/>
			</CardContent>
		</Card>
	);
};

export default Calendar;
