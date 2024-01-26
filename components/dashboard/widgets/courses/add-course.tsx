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
import React from "react";
import AddCourseInputs from "./add-course-inputs";
import { PlusSquare } from "lucide-react";

const AddCourse = () => {
	const AddCourse = async () => {};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<PlusSquare className="">Add Course</PlusSquare>
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
