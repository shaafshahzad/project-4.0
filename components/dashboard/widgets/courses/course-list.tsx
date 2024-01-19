import React, { useEffect, useState } from "react";
import CourseItem from "./course-item";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Course {
	name: string;
	grading: { [key: string]: string };
	weeklyTopics: { [key: string]: string };
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
						const courses = Object.keys(data).map((key) => ({
							name: key,
							...data[key],
						}));
						setCourses(courses);
					}
				});

				return unsubscribe;
			}
		};

		const unsubscribe = fetchCourses();
		return () => unsubscribe && unsubscribe();
	}, [user]);

	useEffect(() => {
		console.log(courses);
	}, [courses]);

	return (
		<div className="h-32 overflow-auto">
			{courses.length > 0 ? (
				<div className="flex flex-col">
					{courses.map((course, index) => (
						<CourseItem
							key={index}
							course={course}
							userId={user?.uid}
						/>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center text-muted-foreground text-sm">
					<p>No courses added yet</p>
					<p className="text-xs">Add a course to get started!</p>
				</div>
			)}
		</div>
	);
};

export default CourseList;
