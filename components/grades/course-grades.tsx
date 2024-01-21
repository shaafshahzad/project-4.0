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

interface CourseGradesProps {
	course: {
		name: string;
		grading: {
			assignment: string;
			weight: string;
			mark: string;
		};
		weeklyTopics: { [key: string]: string };
	};
	userId: string;
}

const CourseGrades = ({ course, userId }: CourseGradesProps) => {
	const [mark, setMark] = React.useState({});
	const sortedGrading = Object.entries(course.grading).sort((a, b) =>
		a[0].localeCompare(b[0])
	);

	const handleAddMark = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMark(e.target.value);
	};

	const handleSaveMark = async (key: string) => {
		const docRef = doc(db, "courses", userId, course.name, "grading");
		await updateDoc(docRef, {
			key: {
				...course.grading,
				mark: mark,
			},
		});
	};

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
									value={course.grading.mark}
									className="w-1/2 h-1/2 text-xs text-center truncate"
									onChange={handleAddMark}
									onBlur={() => handleSaveMark(key)}
								/>
								<Input
									disabled
									placeholder={value}
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
						placeholder="100"
						className="w-1/2 h-1/2 text-xs text-center truncate"
					/>
				</div>
				<div className="w-full flex justify-between">
					<Label className="text-xs">Total Grade</Label>
					<Input
						disabled
						placeholder="100"
						className="w-1/2 h-1/2 text-xs text-center truncate"
					/>
				</div>
			</CardFooter>
		</Card>
	);
};

export default CourseGrades;
