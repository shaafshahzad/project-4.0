import { db } from "@/lib/firebase";
import { doc, setDoc, updateDoc, deleteDoc, collection } from "firebase/firestore";
import { Assignment, Task } from "@/types";

export const addAssignmentToDatabase = async (userId: string, assignment: Assignment) => {
  const assignmentsRef = collection(db, "users", userId, "assignments");
  await setDoc(doc(assignmentsRef, assignment.id), assignment);
};

export const updateAssignment = async (userId: string, id: string, updatedFields: Partial<Assignment>) => {
  const assignmentRef = doc(db, "users", userId, "assignments", id);
  await updateDoc(assignmentRef, updatedFields);
};

export const deleteAssignment = async (userId: string, id: string) => {
  const assignmentRef = doc(db, "users", userId, "assignments", id);
  await deleteDoc(assignmentRef);
};

export const addTask = (assignment: Assignment, newTask: string): Task[] => {
  return [...assignment.tasks, { id: Date.now(), description: newTask, completed: false }];
};

export const toggleTask = (tasks: Task[], taskId: number): Task[] => {
  return tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
};

export const toggleAllTasks = (tasks: Task[], completed: boolean): Task[] => {
  return tasks.map(task => ({ ...task, completed }));
};

export const deleteTask = (tasks: Task[], taskId: number): Task[] => {
  return tasks.filter(task => task.id !== taskId);
};

export const calculateProgress = (tasks: Task[]): number => {
  return tasks.length > 0
    ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100)
    : 0;
};

export const determineStatus = (tasks: Task[]): string => {
  if (tasks.length === 0) return 'Not Started';
  const allCompleted = tasks.every(task => task.completed);
  return allCompleted ? 'Completed' : 'In Progress';
};