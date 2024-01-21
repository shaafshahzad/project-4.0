"use client";

import React from "react";
import Quote from "@/components/dashboard/quote";
import Courses from "@/components/dashboard/widgets/courses/courses";
import Calendar from "@/components/dashboard/widgets/calendar/calendar";
import Attendance from "@/components/dashboard/widgets/attendance/attendance";
import Grades from "@/components/dashboard/widgets/grades/grades";
import useScreenSize from "@/lib/hooks/use-screensize";

const Dashboard = () => {
	const isScreenBreakpoint = useScreenSize();

	return (
		<div className="flex flex-col px-11 py-6 h-[calc(100%-73px)]">
			<div className="flex justify-between pb-4">
				<h1 className="text-3xl font-semibold">Dashboard</h1>
				{isScreenBreakpoint ? <Quote /> : null}
			</div>
			<div
				className={`gap-4 ${
					isScreenBreakpoint
						? "w-full h-full grid grid-cols-5 grid-rows-2"
						: "flex flex-col"
				}`}
			>
				<Courses />
				<Calendar />
				<Attendance />
				<Grades />
			</div>
		</div>
	);
};

export default Dashboard;
