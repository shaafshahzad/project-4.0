"use client";

import React from 'react'
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useCourses } from "@/lib/hooks/use-courses";
import { useAssignments } from '@/lib/hooks/use-assignment';
import AssignmentList from '@/components/assignments/assignment-list';
import Header from '@/components/assignments/header';
import { Assignment } from '@/types';
import { addAssignmentToDatabase, updateAssignment, deleteAssignment, toggleAllTasks } from '@/lib/utils/assignment-functions';

const Assignments = () => {
  const router = useRouter();
  const user = useAuth(router);
  const courses = useCourses(user);
  const assignments = useAssignments(user?.uid);

  const handleAddAssignment = async (newAssignment: Assignment) => {
    if (user?.uid) {
      await addAssignmentToDatabase(user.uid, newAssignment);
    }
  };

  const handleToggleAllTasks = async (assignmentId: string) => {
    if (user?.uid) {
      const assignment = assignments.find(a => a.id === assignmentId);
      if (assignment) {
        const updatedTasks = toggleAllTasks(assignment.tasks, assignment.status !== 'Completed');
        let updatedStatus = assignment.status;
        if (assignment.status === 'Completed') {
          updatedStatus = 'In Progress';
        } else if (assignment.status === 'Not Started' && updatedTasks.some(task => task.completed)) {
          updatedStatus = 'In Progress';
        } else if (updatedTasks.every(task => !task.completed)) {
          updatedStatus = 'Not Started';
        } else if (updatedTasks.every(task => task.completed)) {
          updatedStatus = 'Completed';
        }
        const updatedProgress = updatedStatus === 'Completed' ? 100 : (updatedStatus === 'Not Started' ? 0 : Math.round((updatedTasks.filter(task => task.completed).length / updatedTasks.length) * 100));
        await updateAssignment(user.uid, assignmentId, { tasks: updatedTasks, status: updatedStatus, progress: updatedProgress });
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

  return (
    <div className="flex flex-col px-11 py-6 h-[calc(100%-73px)]">
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
      />
    </div>
  );
};

export default Assignments;