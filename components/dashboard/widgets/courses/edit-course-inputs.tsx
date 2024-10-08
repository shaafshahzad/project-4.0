import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { AlertDialogDescription } from "@/components/ui/alert-dialog";

interface Grading {
  [assignment: string]: {
    mark: string;
    weight: string;
  };
}

interface Course {
  name: string;
  grading: Grading;
}

interface EditCourseInputsProps {
  course: Course;
  setCourse: (course: Course) => void;
}

const EditCourseInputs = ({ course, setCourse }: EditCourseInputsProps) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourse({ ...course, name: e.target.value });
  };

  const handleGradingChange = (
    assignment: string,
    key: string,
    value: string
  ) => {
    setCourse({
      ...course,
      grading: {
        ...course.grading,
        [assignment]: { ...course.grading[assignment], [key]: value },
      },
    });
  };

  const handleAssignmentNameChange = (
    oldAssignmentName: string,
    newAssignmentName: string
  ) => {
    const newGrading = { ...course.grading };
    newGrading[newAssignmentName] = newGrading[oldAssignmentName];
    delete newGrading[oldAssignmentName];
    setCourse({ ...course, grading: newGrading });
  };

  return (
    <AlertDialogDescription className="space-y-4 overflow-auto h-96">
      <div>
        <Label className="mb-2">Course Name</Label>
        <Input value={course.name} onChange={handleNameChange} />
      </div>
      <div>
        <Label>Grading</Label>
        <div className="space-y-2">
          {Object.entries(course.grading).map(
            ([assignment, { mark, weight }]) => (
              <div key={assignment} className="flex gap-2">
                <Input
                  value={assignment}
                  className="w-1/2"
                  onChange={(e) =>
                    handleAssignmentNameChange(assignment, e.target.value)
                  }
                />
                <Input
                  value={weight}
                  className="w-1/2"
                  onChange={(e) =>
                    handleGradingChange(assignment, "weight", e.target.value)
                  }
                />
              </div>
            )
          )}
        </div>
      </div>
    </AlertDialogDescription>
  );
};

export default EditCourseInputs;
