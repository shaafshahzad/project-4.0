import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import GradesItem from "./grades-item";
import React from "react";
import { useCourses } from "@/lib/hooks/use-courses";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Grades = () => {
	const router = useRouter();
	const user = useAuth(router);
	const courses = useCourses(user);

	return (
		<Card className="flex flex-col col-span-2">
			<CardHeader className="flex justify-between">
				<CardTitle>Grades</CardTitle>
			</CardHeader>
			<CardContent className="h-full flex flex-col overflow-auto p-0 my-2">
				<div className="flex flex-row text-sm font-normal sticky top-0 z-10 bg-card">
					<Label className="w-1/2 text-left">Course</Label>
					<div className="flex w-1/2 justify-end gap-2">
						<Label className="w-1/2 text-center">
							Current Grade
						</Label>
						<Label className="w-1/2 text-center">
							Weighting Left
						</Label>
					</div>
				</div>
				<Separator className="my-2" />
				<div className="flex flex-col">
					{courses.map((course, index) => (
						<GradesItem key={index} {...course} />
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default Grades;
