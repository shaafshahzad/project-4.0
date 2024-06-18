import React from "react";
import { Courses } from "@/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

interface CourseContentListProps {
  courses: Courses[];
}

const CourseContentList: React.FC<CourseContentListProps> = ({ courses }) => {
  return (
    <div className="flex w-full">
      <Accordion type="single" collapsible className="w-full">
        {courses.map((course) => (
          <AccordionItem key={course.name} value={course.name}>
            <AccordionTrigger>{course.name}</AccordionTrigger>
            <AccordionContent>
              {Object.keys(course.weeklyTopics).map((week) => (
                <div
                  key={week}
                  className="flex items-center justify-between border-b border-gray-200 px-4 py-2 dark:border-gray-800"
                >
                  <p>{week}</p>
                  <p>{course.weeklyTopics[week]}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseContentList;
