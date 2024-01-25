"use client";

import React, { useEffect, useState } from "react";
import CourseGrades from "@/components/grades/course-grades";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import {
	AlertDialog,
	AlertDialogHeader,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCourses } from "@/lib/hooks/use-courses";

const Grades = () => {
	const router = useRouter();
	const user = useAuth(router);
	const courses = useCourses(user);

	return (
		<div className="flex flex-col px-11 py-6 h-[calc(100%-73px)]">
			<div className="flex justify-between pb-4">
				<h1 className="text-3xl font-semibold">Grades</h1>
			</div>
			<div className="h-full grid lg:grid-cols-3 sm:grid-cols-2 auto-rows-[49%] gap-2 overflow-auto">
				{courses.map((course, index) => (
					<CourseGrades
						key={index}
						course={course}
						userId={user?.uid}
					/>
				))}
				<Card className="hover:bg-zinc-100 hover:dark:bg-zinc-900 transition duration-300">
					<CardContent className="h-full flex flex-col justify-center items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100"
							height="100"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="0.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							className="lucide lucide-plus-circle"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="M8 12h8" />
							<path d="M12 8v8" />
						</svg>
						<p className="text-sm mt-2">Upload course outline</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Grades;
