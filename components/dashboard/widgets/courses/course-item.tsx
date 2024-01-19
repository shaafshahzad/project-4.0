import React from "react";
import { Delete, SquarePen, TrashIcon } from "lucide-react";
import DeleteCourse from "./delete-course";
import { Separator } from "@/components/ui/separator";

interface CourseItemProps {
	name: string;
	userId: string;
}

const CourseItem = ({ name, userId }: CourseItemProps) => {
	return (
		<>
			<div className="p-1 flex items-center justify-between duration-200 text-sm">
				<h1>{name}</h1>
				<div className="flex items-center gap-2 ml-1">
					<div className="hover:bg-zinc-200 dark:hover:bg-zinc-500 rounded-md duration-200 cursor-pointer p-1">
						<SquarePen size={18} />
					</div>
					<DeleteCourse name={name} userId={userId} />
				</div>
			</div>
			<Separator />
		</>
	);
};

export default CourseItem;
