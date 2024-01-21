"use client";

import React, { useEffect, useState } from "react";
import CourseGrades from "@/components/grades/course-grades";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

type Course = {
	name: string;
	grading: {
		[assignment: string]: {
			mark: string;
			weight: string;
		};
	};
	weeklyTopics: { [week: string]: string };
};

const Grades = () => {
	const router = useRouter();
	const user = useAuth(router);
	const [courses, setCourses] = useState<Course[]>([]);

	useEffect(() => {
		const fetchCourses = () => {
			if (user) {
				const docRef = doc(db, "courses", user.uid);
				const unsubscribe = onSnapshot(docRef, (docSnap) => {
					if (docSnap.exists()) {
						const data = docSnap.data();
						let fetchedCourses = Object.keys(data).map((key) => ({
							name: key,
							grading: data[key].grading,
							weeklyTopics: data[key].weeklyTopics,
						}));

						fetchedCourses = fetchedCourses.sort((a, b) =>
							a.name.localeCompare(b.name)
						);
						console.log(fetchedCourses);
						setCourses(fetchedCourses);
					}
				});

				return unsubscribe;
			}
		};

		const unsubscribe = fetchCourses();
		return () => unsubscribe && unsubscribe();
	}, [user]);

	return (
		<div className="flex flex-col px-11 py-6 h-full">
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
			</div>
		</div>
	);
};

export default Grades;
