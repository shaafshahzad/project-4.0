import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useCourses } from "@/lib/hooks/use-courses";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import GradesList from "./grades-list";

const Grades = () => {
	const router = useRouter();
	const user = useAuth(router);
	const courses = useCourses(user);

	return (
		<Card className="col-span-2 col-start-4 row-start-2 flex flex-col overflow-hidden">
			<CardHeader className="">
				<CardTitle>Grades</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 overflow-y-auto">
				<GradesList courses={courses} />
			</CardContent>
		</Card>
	);
};

export default Grades;
