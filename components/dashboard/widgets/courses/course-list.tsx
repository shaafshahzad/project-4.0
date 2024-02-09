import React, { useEffect, useState } from "react";
import CourseItem from "./course-item";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

const CourseList = () => {
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
		<div className="">
			{courses.length > 0 ? (
				<div className="">
					{courses.map((course, index) => (
						<CourseItem
							key={index}
							course={course}
							userId={user?.uid}
						/>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center w-full h-full text-sm">
					<p>No courses added yet</p>
					<p className="">Add a course to get started!</p>
				</div>
			)}
		</div>
	);
};

export default CourseList;
