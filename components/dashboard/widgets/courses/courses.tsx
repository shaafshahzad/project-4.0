import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";
import CourseList from "./course-list";
import PdfUpload from "./pdf-upload";
import AddCourse from "./add-course";

const Courses = () => {
	return (
		<Card className="col-span-2 flex flex-col">
			<CardHeader className="flex flex-row justify-between">
				<div className="w-[85%]">
					<CardTitle>Your courses</CardTitle>
					<CardDescription>
						Upload your course outlines or add them manually
					</CardDescription>
				</div>
				<AddCourse />
			</CardHeader>
			<CardContent className="h-full overflow-y-auto">
				<CourseList />
			</CardContent>
			<CardFooter className="pt-2">
				<PdfUpload />
			</CardFooter>
		</Card>
	);
};

export default Courses;
