import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";
import GradesItem from "./grades-item";

interface Course {
  name: string;
  grading: {
    [assignment: string]: {
      mark: string;
      weight: string;
    };
  };
  topics: { [week: string]: string };
}

interface GradesListProps {
  courses: Course[];
}

const GradesList: React.FC<GradesListProps> = ({ courses }) => {
  return (
    <>
      <div className="flex flex-col sticky top-0 bg-card">
        <div className="flex flex-row ">
          <Label className="w-1/2">Course</Label>
          <div className="w-1/2 flex">
            <Label className="w-1/2 text-center">Current Grade</Label>
            <Label className="w-1/2 text-center">Weighting Left</Label>
          </div>
        </div>
        <Separator className="mt-2" />
      </div>
      <div className="">
        {courses.map((course, index) => (
          <GradesItem key={index} {...course} />
        ))}
      </div>
    </>
  );
};

export default GradesList;
