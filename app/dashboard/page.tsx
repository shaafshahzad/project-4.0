"use client";

import React from "react";
import Quote from "@/components/dashboard/quote";
import Courses from "@/components/dashboard/widgets/courses/courses";
import Calendar from "@/components/dashboard/widgets/calendar/calendar";
import Assignments from "@/components/dashboard/widgets/assignments/assignments";
import Grades from "@/components/dashboard/widgets/grades/grades";
import useScreenSize from "@/lib/hooks/use-screensize";

const Dashboard = () => {
	const isScreenBreakpoint = useScreenSize();

	return (
		<div className="flex flex-col px-11 py-6 h-[calc(100vh-73px)] overflow-hidden">
			<div className="flex justify-between pb-4">
				<h1 className="text-3xl font-semibold">Dashboard</h1>
				{isScreenBreakpoint ? <Quote /> : null}
			</div>
			<div
				className={`gap-4 ${
					isScreenBreakpoint
						? "w-full h-full grid grid-cols-5 grid-rows-2 overflow-hidden"
						: "flex flex-col overflow-y-auto"
				}`}
			>
				<Courses />
				<Calendar />
				<Assignments />
				<Grades />
			</div>
		</div>
	);
};

export default Dashboard;
