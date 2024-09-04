import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";

interface Grading {
  id: number;
  category: string;
  weight: string;
}

interface WeeklyTopic {
  id: number;
  week: string;
}

interface CourseData {
  name: string;
  grading: Grading[];
}

interface AddCourseInputsProps {
  setCourseData: React.Dispatch<React.SetStateAction<CourseData>>;
}

const AddCourseInputs = ({ setCourseData }: AddCourseInputsProps) => {
  const [name, setName] = React.useState("");
  const [grading, setGrading] = React.useState<Grading[]>([
    { id: Date.now(), category: "", weight: "" },
  ]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setCourseData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleGrading = (id: number, key: string, value: string) => {
    const newGrading = grading.map((item) =>
      item.id === id ? { ...item, [key]: value } : item
    );
    setGrading(newGrading);
    setCourseData((prev) => ({
      ...prev,
      grading: newGrading,
    }));
  };

  const addGrading = () => {
    setGrading([...grading, { id: Date.now(), category: "", weight: "" }]);
  };

  const deleteGrading = (id: number) => {
    if (grading.length === 1) return;
    const newGrading = grading.filter((item) => item.id !== id);
    setGrading(newGrading);
    setCourseData((prev) => ({
      ...prev,
      grading: newGrading,
    }));
  };

  return (
    <AlertDialogDescription className="space-y-4 overflow-auto h-96">
      <div>
        <Label className="mb-2">Course Name</Label>
        <Input
          placeholder="Enter course name here"
          value={name}
          onChange={handleName}
        />
      </div>
      <div>
        <Label>Grading</Label>
        <div className="space-y-2">
          {grading.map(({ id, category, weight }) => (
            <div key={id} className="flex gap-2 items-center">
              <Input
                placeholder="Category"
                value={category}
                onChange={(e) => handleGrading(id, "category", e.target.value)}
              />
              <Input
                placeholder="Weight"
                value={weight}
                onChange={(e) => handleGrading(id, "weight", e.target.value)}
              />
              <div className="hover:bg-red-100 dark:hover:bg-zinc-500 rounded-md duration-200 cursor-pointer p-1">
                <XCircleIcon
                  size={24}
                  onClick={() => deleteGrading(id)}
                  color="#db2c2c"
                />
              </div>
            </div>
          ))}
          <Button className="w-full" onClick={addGrading}>
            Add Grading Criteria
          </Button>
        </div>
      </div>
    </AlertDialogDescription>
  );
};

export default AddCourseInputs;
