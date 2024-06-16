import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectValue,
	SelectItem,
} from "@/components/ui/select";
import { useAuth } from "@/lib/hooks/use-auth";
import { useCourses } from "@/lib/hooks/use-courses";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CourseWeeklyContent from "./course-weekly-content";

const Content = () => {
	const router = useRouter();
	const user = useAuth(router);
	const courses = useCourses(user);
	const [selectedCourse, setSelectedCourse] = useState<string>("");

	return (
		<Card className="flex flex-col col-span-3 row-start-2">
			<CardHeader>
				<CardTitle className="flex">
					<Select onValueChange={(value) => setSelectedCourse(value)}>
						<SelectTrigger>
							<SelectValue placeholder="Select a course to view its content" />
						</SelectTrigger>
						<SelectContent>
							{courses.map((course) => (
								<SelectItem
									value={course.name}
									key={course.name}
								>
									{course.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardTitle>
			</CardHeader>
			<CardContent className="h-full w-full">
				<CourseWeeklyContent selectedCourse={selectedCourse} />
			</CardContent>
		</Card>
	);
};

export default Content;
