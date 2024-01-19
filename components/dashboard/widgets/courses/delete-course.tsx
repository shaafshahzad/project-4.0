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
	name: string;
	userId: string;
}

const DeleteCourse = ({ name, userId }: DeleteCourseProps) => {
	const deleteConversation = async () => {
		const userDocRef = doc(db, "courses", userId);
		await updateDoc(userDocRef, {
			[name]: deleteField(),
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
					Are you sure you want to delete {name}?
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => deleteConversation()}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteCourse;
