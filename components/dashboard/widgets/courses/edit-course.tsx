import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { SquarePen } from "lucide-react";
import React from "react";
import EditCourseInputs from "./edit-course-inputs";

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

interface EditCourseProps {
	course: Course;
	userId: string;
}

const EditCourse = ({ course, userId }: EditCourseProps) => {
	const editCourse = async () => {};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<div className="hover:bg-zinc-200 dark:hover:bg-zinc-500 rounded-md duration-200 cursor-pointer p-1">
					<SquarePen size={18} />
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Edit Course</AlertDialogTitle>
				</AlertDialogHeader>
				<EditCourseInputs course={course} />
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => editCourse()}>
						Save
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default EditCourse;
