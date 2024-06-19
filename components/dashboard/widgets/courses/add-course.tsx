import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import React from "react";
import AddCourseInputs from "./add-course-inputs";
import { PlusSquare } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";

interface Grading {
  id: number;
  category: string;
  weight: string;
}

interface WeeklyTopic {
  id: number;
  week: string;
  topic: string;
}

interface CourseData {
  name: string;
  grading: Grading[];
  topics: WeeklyTopic[];
}

interface Props {
  pathname: string;
}

const AddCourse = ({ pathname }: Props) => {
  const router = useRouter();
  const user = useAuth(router);
  const [courseData, setCourseData] = React.useState<CourseData>({
    name: "",
    grading: [],
    topics: [],
  });

  const addCourse = async () => {
    if (!user) return;

    try {
      const filteredtopics = courseData.topics.filter(
        (topic) => topic.week && topic.topic
      );
      const userDocRef = doc(db, "courses", user.uid);
      await updateDoc(userDocRef, {
        [courseData.name]: {
          grading: courseData.grading.reduce(
            (acc, { category, weight }) => ({ ...acc, [category]: { weight } }),
            {}
          ),
          topics: filteredtopics.reduce(
            (acc, { week, topic }) => ({ ...acc, [week]: topic }),
            {}
          ),
        },
      });
    } catch (error) {
      console.error("Error adding course: ", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {pathname === "/grades" ? (
          <Card className="hover:bg-zinc-100 hover:dark:bg-zinc-900 h-full transition duration-300">
            <CardContent className="h-full flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
              <p className="text-sm mt-2">Add a new course</p>
            </CardContent>
          </Card>
        ) : (
          <PlusSquare className="">Add Course</PlusSquare>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Course</AlertDialogTitle>
        </AlertDialogHeader>
        <AddCourseInputs setCourseData={setCourseData} />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={addCourse}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddCourse;
