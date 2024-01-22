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
import AddCourseInputs from "./add-course-inputs";
import { Button } from "@/components/ui/button";

const AddCourse = () => {
	const AddCourse = async () => {};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button className="flex flex-row items-center">
					Add Course
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Add Course</AlertDialogTitle>
				</AlertDialogHeader>
				<AddCourseInputs />
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => AddCourse()}>
						Save
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AddCourse;
