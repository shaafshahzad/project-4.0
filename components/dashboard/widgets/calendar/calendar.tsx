"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDateTitle } from "@/lib/get-date-title";
import React from "react";

const Calendar = () => {
	const title = getDateTitle();

	return (
		<Card className="flex flex-col col-span-3 col-start-3">
			<CardHeader className="py-3">
				<CardTitle className="text-lg">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>Calendar widget goes here</p>
			</CardContent>
		</Card>
	);
};

export default Calendar;
