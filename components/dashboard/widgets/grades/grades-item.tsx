"use client";

import { useGrades } from "@/lib/hooks/use-grades";
import { Separator } from "@/components/ui/separator";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";

interface Grading {
	[assignment: string]: {
		mark: string;
		weight: string;
	};
}

interface Course {
	name: string;
	grading: Grading;
	weeklyTopics: { [week: string]: string };
}

const GradesItem = (course: Course) => {
	const [marks, setMarks] = React.useState<Grading>(course.grading);
	const { currentGrade, remainingWeight } = useGrades(marks);

	useEffect(() => {
		if (course.grading) {
			setMarks(course.grading);
		}
	}, [course.grading]);

	return (
		<>
			<div className="flex text-xs">
				<h1 className="w-1/2">{course.name}</h1>
				<div className="w-1/2 flex justify-between items-center">
					<p className="w-1/2 text-center">{currentGrade}%</p>
					<p className="w-1/2 text-center">{remainingWeight}%</p>
				</div>
			</div>
			<Separator className="my-2" />
		</>
	);
};

export default GradesItem;
