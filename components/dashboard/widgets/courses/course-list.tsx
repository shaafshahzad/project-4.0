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
		const fetchCourses = async () => {
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

		fetchCourses();
	}, [user]);

	useEffect(() => {
		console.log(courses);
	}, [courses]);

	return (
		<div>
			{courses.map((course, index) => (
				<CourseItem key={index} name={course.name} />
			))}
		</div>
	);
};

export default CourseList;
