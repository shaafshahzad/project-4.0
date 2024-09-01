import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Edit2, Trash2, Bell, CheckCircle2 } from 'lucide-react';
import { format, isValid } from "date-fns";
import EditAssignmentDialog from './edit-assignment-dialog';
import { Assignment, Courses } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface AssignmentCardProps {
  assignment: Assignment;
  courses: Courses[];
  courseColor: string;
  onToggleAllTasks: (assignmentId: string) => void;
  onDeleteAssignment: (id: string) => void;
  onEditAssignment: (assignment: Assignment) => void;
}

const AssignmentCard = ({ assignment, courses, courseColor, onToggleAllTasks, onDeleteAssignment, onEditAssignment }: AssignmentCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Card className="cursor-pointer hover:shadow-md transition-shadow" style={{ borderLeft: `8px solid ${courseColor}` }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-col">
            <CardTitle className="text-md font-medium">
              {assignment.title}
            </CardTitle>
            <CardDescription className='text-xs truncate max-w-[250px]'>
              {assignment.course}
            </CardDescription>
          </div>
          <Badge variant={assignment.priority === 'High' ? 'destructive' : assignment.priority === 'Medium' ? 'default' : 'secondary'}>
            {assignment.priority}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Due: {isValid(assignment.dueDate) ? format(assignment.dueDate, "PPP") : "Invalid Date"}</span>
            <span className="text-sm font-semibold">{assignment.status}</span>
          </div>
          <Progress value={assignment.progress} className="mb-2" />
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={() => setIsEditDialogOpen(true)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the assignment "{assignment.title}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                      onDeleteAssignment(assignment.id);
                      toast.success("Assignment deleted", {
                        description: `${assignment.title} has been deleted`,
                      });
                    }}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Button 
              variant={assignment.status === 'Completed' ? "secondary" : "outline"} 
              size="sm"
              onClick={() => onToggleAllTasks(assignment.id)}
              className={assignment.status === 'Completed' ? "bg-green-500 hover:bg-green-600 text-white" : ""}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {assignment.status === 'Completed' ? 'Completed' : 'Mark Complete'}
            </Button>
          </div>
        </CardContent>
      </Card>
      <EditAssignmentDialog 
        assignment={assignment} 
        courses={courses} 
        onSaveChanges={onEditAssignment}
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
      />
    </>
  );
};

export default AssignmentCard;