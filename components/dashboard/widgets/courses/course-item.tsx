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
			<div className="flex justify-between items-center py-1 text-sm">
				<p>{course.name}</p>
				<div className="flex">
					<EditCourse course={course} userId={userId} />
					<DeleteCourse course={course} userId={userId} />
				</div>
			</div>
			<Separator />
		</>
	);
};

export default CourseItem;
