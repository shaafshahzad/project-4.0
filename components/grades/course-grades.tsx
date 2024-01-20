import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";

interface CourseGradesProps {
	course: {
		name: string;
		grading: { [key: string]: string };
		weeklyTopics: { [key: string]: string };
	};
	userId: string;
}

const CourseGrades = ({ course, userId }: CourseGradesProps) => {
	const sortedGrading = Object.entries(course.grading).sort((a, b) =>
		a[0].localeCompare(b[0])
	);
	const [grades, setGrades] = React.useState<{ [key: string]: string }>({});

	const handleGradeChange = (assignment: string, value: string) => {
		setGrades({ ...grades, [assignment]: value });
	};

	return (
		<Card className="border flex flex-col items-center p-2">
			<CardHeader className="flex items-center py-2">
				<CardTitle className="text-sm font-normal text-center">
					{course.name}
				</CardTitle>
			</CardHeader>
			<Separator className="w-[95%]" />
			<CardContent className="flex flex-col w-[95%] justify-between overflow-auto my-2 p-0">
				<div className="w-full flex justify-between text-xs pb-2 mb-2 border-b sticky top-0 bg-card">
					<Label>Assignment</Label>
					<div className="flex w-1/2 justify-end">
						<Label className="w-1/2 text-center">Grade (%)</Label>
						<Label className="w-1/2 text-center">Weight (%)</Label>
					</div>
				</div>
				<div className="w-full flex flex-col justify-between">
					{sortedGrading.map(([key, value], index) => (
						<div
							key={index}
							className="w-full flex justify-between"
						>
							<Label className="text-xs">{key}</Label>
							<div className="w-1/2 flex justify-end">
								<Input
									placeholder="Add Mark"
									className="w-1/2 h-1/2 text-xs text-center truncate"
								/>
								<Label className="w-1/2 text-xs text-center">
									{value}
								</Label>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default CourseGrades;
