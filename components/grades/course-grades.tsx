import React, { useEffect } from "react";
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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

interface CourseGradesProps {
	course: Course;
	userId: string;
}

const CourseGrades = ({ course, userId }: CourseGradesProps) => {
	const [marks, setMarks] = React.useState<Grading>(course.grading);
	const [currentGrade, setCurrentGrade] = React.useState(0);
	const [totalGrade, setTotalGrade] = React.useState(0);

	useEffect(() => {
		if (course.grading) {
			setMarks(course.grading);
		}
	}, [course.grading]);

	useEffect(() => {
		const completedAssignments = Object.values(marks).filter(
			({ mark }) => mark !== ""
		);
		const currentGradeWeightedSum = completedAssignments.reduce(
			(acc, { mark, weight }) =>
				acc + parseFloat(mark) * parseFloat(weight),
			0
		);
		const currentWeightSum = completedAssignments.reduce(
			(acc, { weight }) => acc + parseFloat(weight),
			0
		);
		const currentGradeAvg =
			currentWeightSum > 0
				? currentGradeWeightedSum / currentWeightSum
				: 0;

		// Calculate total grade
		const totalAssignments = Object.values(marks);
		const totalGradeWeightedSum = totalAssignments.reduce(
			(acc, { mark, weight }) =>
				acc + (mark ? parseFloat(mark) : 0) * parseFloat(weight),
			0
		);
		const totalWeightSum = totalAssignments.reduce(
			(acc, { weight }) => acc + parseFloat(weight),
			0
		);
		const totalGradeAvg =
			totalWeightSum > 0 ? totalGradeWeightedSum / totalWeightSum : 0;

		setCurrentGrade(parseFloat(currentGradeAvg.toFixed(2)));
		setTotalGrade(parseFloat(totalGradeAvg.toFixed(2)));
	}, [marks]);

	const handleAddMark =
		(assignment: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setMarks({
				...marks,
				[assignment]: { ...marks[assignment], mark: e.target.value },
			});
		};

	const handleSaveMark = async (assignment: string) => {
		if (!marks || !marks[assignment]) {
			console.error("Mark data is not available");
			return;
		}

		const courseDocRef = doc(db, "courses", userId);
		const gradingField = `${course.name}.grading.${assignment}.mark`;

		try {
			await updateDoc(courseDocRef, {
				[gradingField]: marks[assignment].mark,
			});
		} catch (error) {
			console.error("Error updating grade:", error);
		}
	};

	const sortedGrading = course.grading
		? Object.entries(course.grading).sort((a, b) =>
				a[0].localeCompare(b[0])
		  )
		: [];

	return (
		<Card className="border flex flex-col items-center p-2">
			<CardHeader className="flex items-center py-2">
				<CardTitle className="text-sm font-normal text-center">
					{course.name}
				</CardTitle>
			</CardHeader>
			<Separator className="w-[95%]" />
			<CardContent className="h-full flex flex-col w-[95%] overflow-auto my-2 p-0">
				<div className="w-full flex justify-between text-xs pb-2 mb-2 border-b sticky top-0 bg-card z-10">
					<Label>Assignment</Label>
					<div className="flex w-1/2 justify-end gap-2">
						<Label className="w-1/2 text-center">Grade (%)</Label>
						<Label className="w-1/2 text-center">Weight (%)</Label>
					</div>
				</div>
				<div className="w-full flex flex-col justify-between">
					{sortedGrading.map(([assignment, { weight }]) => (
						<div
							key={assignment}
							className="w-full flex justify-between"
						>
							<Label className="text-xs">{assignment}</Label>
							<div className="w-1/2 flex justify-end gap-4">
								<Input
									placeholder="Add Mark"
									type="number"
									min={0}
									max={100}
									value={marks[assignment]?.mark || ""}
									className="w-1/2 h-1/2 text-xs text-center truncate"
									onChange={handleAddMark(assignment)}
									onBlur={() => handleSaveMark(assignment)}
								/>
								<Input
									disabled
									placeholder={weight}
									className="w-1/2 h-1/2 text-xs text-center truncate"
								/>
							</div>
						</div>
					))}
				</div>
			</CardContent>
			<Separator className="w-[95%] mb-2" />
			<CardFooter className="flex flex-col items-start w-[95%] px-0 pb-2">
				<div className="w-full flex justify-between">
					<Label className="text-xs">Current Grade</Label>
					<Input
						disabled
						value={currentGrade}
						placeholder="100"
						className="w-1/2 h-1/2 text-xs text-center truncate"
					/>
				</div>
				<div className="w-full flex justify-between">
					<Label className="text-xs">Total Grade</Label>
					<Input
						disabled
						value={totalGrade}
						placeholder="100"
						className="w-1/2 h-1/2 text-xs text-center truncate"
					/>
				</div>
			</CardFooter>
		</Card>
	);
};

export default CourseGrades;
