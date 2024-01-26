"use client";

import { useGrades } from "@/lib/hooks/use-grades";
import { Separator } from "@/components/ui/separator";
import React, { useEffect } from "react";

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
			<div className="flex text-sm py-2">
				<p className="w-1/2">{course.name}</p>
				<div className="flex w-1/2 items-center">
					<p className="text-center w-1/2">{currentGrade}%</p>
					<p className="text-center w-1/2">{remainingWeight}%</p>
				</div>
			</div>
			<Separator className="" />
		</>
	);
};

export default GradesItem;
