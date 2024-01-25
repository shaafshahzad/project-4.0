import React from "react";
import { Delete, SquarePen, TrashIcon } from "lucide-react";
import DeleteCourse from "./delete-course";
import EditCourse from "./edit-course";
import { Separator } from "@/components/ui/separator";

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

interface CourseItemProps {
	course: Course;
	userId: string;
}

const CourseItem = ({ course, userId }: CourseItemProps) => {
	return (
		<>
			<div className="p-1 flex items-center justify-between duration-200 text-xs">
				<h1>{course.name}</h1>
				<div className="flex items-center gap-2 ml-1">
					<EditCourse course={course} userId={userId} />
					<DeleteCourse course={course} userId={userId} />
				</div>
			</div>
			<Separator />
		</>
	);
};

export default CourseItem;
