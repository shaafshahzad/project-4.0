import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Course = {
  name: string;
  grading: {
    [assignment: string]: {
      mark: string;
      weight: string;
    };
  };
  topics: { [week: string]: string };
};

export const useCourses = (user: any) => {
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
              topics: data[key].topics,
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

  return courses;
};
