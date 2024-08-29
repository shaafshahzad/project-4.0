import React, { useMemo } from 'react';
import AssignmentCard from './assignment-card';
import { Assignment, Courses, FilterOptions } from '@/types';
import { generateCourseColor } from '@/lib/utils';

interface AssignmentListProps {
  assignments: Assignment[];
  courses: Courses[];
  onToggleAllTasks: (assignmentId: string) => void;
  onDeleteAssignment: (id: string) => void;
  onEditAssignment: (assignment: Assignment) => void;
  filters: FilterOptions;
}

const AssignmentList = ({ assignments, courses, onToggleAllTasks, onDeleteAssignment, onEditAssignment, filters }: AssignmentListProps) => {
  const courseColors = useMemo(() => {
    return courses.reduce((acc, course) => {
      acc[course.name] = generateCourseColor(course.name);
      return acc;
    }, {} as Record<string, string>);
  }, [courses]);

  const filteredAssignments = assignments.filter(assignment => {
    if (filters.course && assignment.course !== filters.course) return false;
    if (filters.status && assignment.status !== filters.status) return false;
    if (filters.priority && assignment.priority !== filters.priority) return false;
    return true;
  });

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {filteredAssignments.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                courses={courses}
                courseColor={courseColors[assignment.course]}
                onToggleAllTasks={onToggleAllTasks}
                onDeleteAssignment={onDeleteAssignment}
                onEditAssignment={onEditAssignment}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-500">No assignments added yet</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AssignmentList;