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
import { useGrades } from "@/lib/hooks/use-grades";
import GradesCardContent from "./grades-card-content";
import GradesCardFooter from "./grades-card-footer";

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
	const { currentGrade, totalGrade } = useGrades(marks);

	useEffect(() => {
		if (course.grading) {
			setMarks(course.grading);
		}
	}, [course.grading]);

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

	const passOrFail = (grade: number) => {
		return grade >= 49.5;
	};

	return (
		<Card className="border flex flex-col items-center p-2">
			<CardHeader className="flex items-center py-2">
				<CardTitle className="text-sm font-normal text-center">
					{course.name}
				</CardTitle>
			</CardHeader>
			<Separator className="w-[95%]" />
			<GradesCardContent
				marks={marks}
				sortedGrading={sortedGrading}
				handleAddMark={handleAddMark}
				handleSaveMark={handleSaveMark}
			/>
			<Separator className="w-[95%] mb-2" />
			<GradesCardFooter
				currentGrade={currentGrade}
				totalGrade={totalGrade}
				passOrFail={passOrFail}
			/>
		</Card>
	);
};

export default CourseGrades;
