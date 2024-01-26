"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
	return (
		<div>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				themeSystem="united"
				height="80vh"
				events={[
					{ title: "event 1", date: "2024-01-28" },
					{ title: "event 2", date: "2024-01-29" },
				]}
				headerToolbar={{
					left: "prev,next today",
					center: "title",
					right: "dayGridMonth,dayGridWeek,dayGridDay",
				}}
			/>
		</div>
	);
};

export default Calendar;
