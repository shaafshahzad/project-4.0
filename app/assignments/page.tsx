"use client";

import React, { useState, useCallback } from 'react'
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useCourses } from "@/lib/hooks/use-courses";
import { useAssignments } from '@/lib/hooks/use-assignment';
import AssignmentList from '@/components/assignments/assignment-list';
import Header from '@/components/assignments/assignment-header';
import AssignmentSidebar from '@/components/assignments/assignment-sidebar';
import { Assignment, FilterOptions } from '@/types';
import { addAssignmentToDatabase, updateAssignment, deleteAssignment, toggleAllTasks } from '@/lib/utils/assignment-functions';

const Assignments = () => {
  const router = useRouter();
  const user = useAuth(router);
  const courses = useCourses(user);
  const assignments = useAssignments(user?.uid);
  const [filters, setFilters] = useState<FilterOptions>({
    course: null,
    status: null,
    priority: null,
  });

  const handleAddAssignment = async (newAssignment: Assignment) => {
    if (user?.uid) {
      await addAssignmentToDatabase(user.uid, newAssignment);
    }
  };

  const handleToggleAllTasks = async (assignmentId: string) => {
    if (user?.uid) {
      const assignment = assignments.find(a => a.id === assignmentId);
      if (assignment) {
        let updatedStatus = assignment.status;
        let updatedProgress = assignment.progress;
        let updatedTasks = assignment.tasks;

        if (assignment.status === 'Completed') {
          updatedStatus = 'Not Started';
          updatedProgress = 0;
          updatedTasks = updatedTasks.map(task => ({ ...task, completed: false }));
        } else {
          updatedStatus = 'Completed';
          updatedProgress = 100;
          updatedTasks = updatedTasks.map(task => ({ ...task, completed: true }));
        }

        await updateAssignment(user.uid, assignmentId, { 
          tasks: updatedTasks, 
          status: updatedStatus, 
          progress: updatedProgress 
        });
      }
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    if (user?.uid) {
      await deleteAssignment(user.uid, id);
    }
  };

  const handleEditAssignment = async (updatedAssignment: Assignment) => {
    if (user?.uid) {
      await updateAssignment(user.uid, updatedAssignment.id, updatedAssignment);
    }
  };

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="flex flex-row justify-between px-11 py-6 h-[calc(100%-73px)]">
      <div className='flex flex-col w-full pr-11'>
        <Header 
          courses={courses} 
          onAddAssignment={handleAddAssignment}
        />
        <AssignmentList 
          assignments={assignments} 
          courses={courses}
          onToggleAllTasks={handleToggleAllTasks}
          onDeleteAssignment={handleDeleteAssignment}
          onEditAssignment={handleEditAssignment}
          filters={filters}
        />
      </div>
      <AssignmentSidebar assignments={assignments} courses={courses} onFilterChange={handleFilterChange} />
    </div>
  );
};

export default Assignments;