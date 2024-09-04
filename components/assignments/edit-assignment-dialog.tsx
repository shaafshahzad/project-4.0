import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Assignment, Courses } from '@/types';
import EditAssignmentForm from './edit-assignment-form';

interface EditAssignmentDialogProps {
  assignment: Assignment;
  courses: Courses[];
  onSaveChanges: (updatedAssignment: Assignment) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditAssignmentDialog = ({ assignment, courses, onSaveChanges, open, setOpen }: EditAssignmentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Assignment</DialogTitle>
        </DialogHeader>
        <EditAssignmentForm
          assignment={assignment}
          courses={courses}
          onSaveChanges={onSaveChanges}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditAssignmentDialog;