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
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          courses={courses}
          onAddAssignment={onAddAssignment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddAssignmentDialog;