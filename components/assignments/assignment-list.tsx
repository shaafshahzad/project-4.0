import React from 'react';
import AssignmentCard from './assignment-card';
import { Assignment, Courses } from '@/types';

interface AssignmentListProps {
  assignments: Assignment[];
  courses: Courses[];
  onToggleAllTasks: (assignmentId: string) => void;
  onDeleteAssignment: (id: string) => void;
  onEditAssignment: (assignment: Assignment) => void;
}

const AssignmentList = ({ assignments, courses, onToggleAllTasks, onDeleteAssignment, onEditAssignment }: AssignmentListProps) => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <AssignmentCard 
              key={assignment.id} 
              assignment={assignment} 
              courses={courses}
              onToggleAllTasks={onToggleAllTasks}
              onDeleteAssignment={onDeleteAssignment}
              onEditAssignment={onEditAssignment}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AssignmentList;