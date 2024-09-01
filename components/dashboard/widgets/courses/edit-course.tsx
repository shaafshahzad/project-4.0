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
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { SquarePen } from "lucide-react";
import React, { useState } from "react";
import EditCourseInputs from "./edit-course-inputs";
import { toast } from "sonner";

interface Grading {
  [assignment: string]: {
    mark: string;
    weight: string;
  };
}

interface Course {
  name: string;
  grading: Grading;
  topics: { [week: string]: string };
}

interface EditCourseProps {
  course: Course;
  userId: string;
}

const EditCourse = ({ course, userId }: EditCourseProps) => {
  const [updatedCourse, setUpdatedCourse] = useState<Course>(course);

  const editCourse = async () => {
    const oldCourseName = course.name;
    const newCourseName = updatedCourse.name;

    try {
      const userDocRef = doc(db, "courses", userId);

      if (oldCourseName !== newCourseName) {
        await updateDoc(userDocRef, {
          [oldCourseName]: deleteField(),
          [newCourseName]: {
            grading: updatedCourse.grading,
            topics: updatedCourse.topics,
          },
        });
      } else {
        const gradingUpdates: { [key: string]: any } = {};
        for (const [oldAssignmentName, { mark, weight }] of Object.entries(
          course.grading
        )) {
          if (updatedCourse.grading[oldAssignmentName]) {
            gradingUpdates[`grading.${oldAssignmentName}.mark`] = mark;
            gradingUpdates[`grading.${oldAssignmentName}.weight`] = weight;
          } else {
            const newAssignmentName = Object.keys(updatedCourse.grading).find(
              (newName) =>
                updatedCourse.grading[newName].mark === mark &&
                updatedCourse.grading[newName].weight === weight
            );
            if (newAssignmentName) {
              gradingUpdates[`grading.${newAssignmentName}.mark`] = mark;
              gradingUpdates[`grading.${newAssignmentName}.weight`] = weight;
              gradingUpdates[`grading.${oldAssignmentName}`] = deleteField();
            }
          }
        }
        await updateDoc(userDocRef, {
          [oldCourseName]: deleteField(),
          [newCourseName]: {
            grading: updatedCourse.grading,
            topics: updatedCourse.topics,
            ...gradingUpdates,
          },
        });
      }
      toast.success("Course updated", {
        description: `${course.name} has been updated`,
      });
    } catch (error) {
      console.error("Error updating course: ", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="hover:bg-zinc-200 dark:hover:bg-zinc-500 rounded-md duration-200 cursor-pointer p-1">
          <SquarePen size={18} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Course</AlertDialogTitle>
        </AlertDialogHeader>
        <EditCourseInputs course={updatedCourse} setCourse={setUpdatedCourse} />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={editCourse}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditCourse;
