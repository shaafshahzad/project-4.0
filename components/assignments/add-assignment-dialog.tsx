import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import AddAssignmentForm from './add-assignment-form';
import { Assignment, Courses } from '@/types';

interface AddAssignmentDialogProps {
  courses: Courses[];
  onAddAssignment: (assignment: Assignment) => void;
}

const AddAssignmentDialog = ({ courses, onAddAssignment }: AddAssignmentDialogProps) => {
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    course: '',
    title: '',
    dueDate: new Date(),
    status: 'Not Started',
    priority: 'Medium',
    description: '',
  });

  const addAssignment = () => {
    if (newAssignment.course && newAssignment.title && newAssignment.dueDate) {
      const assignmentToAdd: Assignment = {
        id: Date.now().toString(),
        course: newAssignment.course,
        title: newAssignment.title,
        dueDate: newAssignment.dueDate,
        status: newAssignment.status as string,
        priority: newAssignment.priority as 'High' | 'Medium' | 'Low',
        progress: 0,
        description: newAssignment.description || '',
        tasks: []
      };

      onAddAssignment(assignmentToAdd);
      setNewAssignment({
        course: '',
        title: '',
        dueDate: new Date(),
        status: 'Not Started',
        priority: 'Medium',
        description: '',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Assignment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Assignment</DialogTitle>
        </DialogHeader>
        <AddAssignmentForm
          newAssignment={newAssignment}
          setNewAssignment={setNewAssignment}
          courses={courses}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={addAssignment}>Add Assignment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssignmentDialog;