import React from "react";
import { Separator } from "../ui/separator";
import CourseContentList from "./course-content-list";
import { Courses } from "@/types";

interface SidebarContentProps {
	courses: Courses[];
}

const SidebarContent: React.FC<SidebarContentProps> = ({ courses }) => {
	return (
		<div className="w-full max-w-xs h-full lg:border-r flex flex-col items-center p-6">
			<p className="text-2xl font-bold">Content</p>
			<p className="text-sm text-gray-500 mt-2">
				Select a topic below to get started.
			</p>
			<Separator className="w-full my-6" />
			<CourseContentList courses={courses} />
		</div>
	);
};

export default SidebarContent;
