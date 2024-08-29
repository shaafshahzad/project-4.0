import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { Assignment, Courses } from '@/types';

interface AddAssignmentFormProps {
  newAssignment: Partial<Assignment>;
  setNewAssignment: React.Dispatch<React.SetStateAction<Partial<Assignment>>>
  courses: Courses[];
}

const AddAssignmentForm = ({ newAssignment, setNewAssignment, courses }: AddAssignmentFormProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="course" className="text-right">Course</Label>
        <Select
          value={newAssignment.course}
          onValueChange={(value) => setNewAssignment({...newAssignment, course: value})}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.name} value={course.name}>{course.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">Title</Label>
        <Input
          id="title"
          value={newAssignment.title}
          onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="dueDate" className="text-right">Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`col-span-3 justify-start text-left font-normal ${!newAssignment.dueDate && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Due: {newAssignment.dueDate ? format(newAssignment.dueDate, "PPP") : "Invalid Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={newAssignment.dueDate}
              onSelect={(date) => setNewAssignment({...newAssignment, dueDate: date as Date})}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="priority" className="text-right">Priority</Label>
        <Select
          value={newAssignment.priority}
          onValueChange={(value: 'High' | 'Medium' | 'Low') => setNewAssignment({...newAssignment, priority: value})}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">Description</Label>
        <Textarea
          id="description"
          value={newAssignment.description}
          onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
          className="col-span-3"
        />
      </div>
    </div>
  );
};

export default AddAssignmentForm;