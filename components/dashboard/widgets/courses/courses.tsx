import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";
import CourseList from "./course-list";
import PdfUpload from "./pdf-upload";
import { Button } from "@/components/ui/button";
import AddCourse from "./add-course";

const Courses = () => {
	return (
		<Card className="flex flex-col col-span-2 row-span-1">
			<CardHeader className="flex flex-row justify-between">
				<div className="flex flex-col">
					<CardTitle>Your courses</CardTitle>
					<CardDescription>
						Upload your course outlines or add them manually
					</CardDescription>
				</div>
				<AddCourse />
			</CardHeader>
			<CardContent className="h-full flex flex-col justify-between">
				<CourseList />
				<PdfUpload />
			</CardContent>
		</Card>
	);
};

export default Courses;
