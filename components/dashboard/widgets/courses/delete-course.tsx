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
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { TrashIcon } from "lucide-react";
import React from "react";

interface DeleteCourseProps {
	course: {
		name: string;
		grading: { [key: string]: string };
		weeklyTopics: { [key: string]: string };
	};
	userId: string;
}

const DeleteCourse = ({ course, userId }: DeleteCourseProps) => {
	const deleteConversation = async () => {
		const userDocRef = doc(db, "courses", userId);
		await updateDoc(userDocRef, {
			[course.name]: deleteField(),
		});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<div className="hover:bg-red-100 dark:hover:bg-zinc-500 rounded-md duration-200 cursor-pointer p-1">
					<TrashIcon size={18} color="#db2c2c" />
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete course</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					Are you sure you want to delete {course.name}?
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => deleteConversation()}
						className="bg-destructive dark:text-white"
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteCourse;
