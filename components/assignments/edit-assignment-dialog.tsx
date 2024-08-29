import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Trash2 } from 'lucide-react';
import { format } from "date-fns";
import { Assignment, Courses, Task } from '@/types';

interface EditAssignmentDialogProps {
  assignment: Assignment;
  courses: Courses[];
  onSaveChanges: (updatedAssignment: Assignment) => void;
}

const EditAssignmentDialog = ({ assignment, courses, onSaveChanges }: EditAssignmentDialogProps) => {
  const [editingAssignment, setEditingAssignment] = useState<Assignment>(assignment);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTasks = [...editingAssignment.tasks, { id: Date.now(), description: newTask, completed: false }];
    setEditingAssignment({ ...editingAssignment, tasks: newTasks });
    setNewTask('');
  };

  const toggleTask = (taskId: number) => {
    const newTasks = editingAssignment.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    let newStatus = editingAssignment.status;
    if (editingAssignment.status === 'Not Started' && newTasks.some(task => task.completed)) {
      newStatus = 'In Progress';
    } else if (newTasks.every(task => !task.completed)) {
      newStatus = 'Not Started';
    } else if (newTasks.every(task => task.completed)) {
      newStatus = 'Completed';
    } else {
      newStatus = 'In Progress';
    }
    const newProgress = newStatus === 'Completed' ? 100 : (newStatus === 'Not Started' ? 0 : Math.round((newTasks.filter(task => task.completed).length / newTasks.length) * 100));
    setEditingAssignment({ ...editingAssignment, tasks: newTasks, status: newStatus, progress: newProgress });
  };

  const deleteTask = (taskId: number) => {
    const newTasks = editingAssignment.tasks.filter(task => task.id !== taskId);
    setEditingAssignment({ ...editingAssignment, tasks: newTasks });
  };

  const saveChanges = () => {
    let tasks = editingAssignment.tasks;
    let progress = editingAssignment.progress;

    if (editingAssignment.status === 'Not Started') {
      tasks = tasks.map(task => ({ ...task, completed: false }));
      progress = 0;
    } else if (editingAssignment.status === 'Completed') {
      tasks = tasks.map(task => ({ ...task, completed: true }));
      progress = 100;
    } else {
      progress = Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100);
    }

    const updatedAssignment = { ...editingAssignment, tasks, progress };
    onSaveChanges(updatedAssignment);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Assignment</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="course" className="text-right">Course</Label>
          <Select
            value={editingAssignment.course}
            onValueChange={(value) => setEditingAssignment({...editingAssignment, course: value})}
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
            value={editingAssignment.title}
            onChange={(e) => setEditingAssignment({...editingAssignment, title: e.target.value})}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="dueDate" className="text-right">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`col-span-3 justify-start text-left font-normal ${!editingAssignment.dueDate && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {editingAssignment.dueDate ? format(editingAssignment.dueDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={editingAssignment.dueDate}
                onSelect={(date) => setEditingAssignment({...editingAssignment, dueDate: date as Date})}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">Status</Label>
          <Select
            value={editingAssignment.status}
            onValueChange={(value) => setEditingAssignment({...editingAssignment, status: value})}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="priority" className="text-right">Priority</Label>
          <Select
            value={editingAssignment.priority}
            onValueChange={(value: 'High' | 'Medium' | 'Low') => setEditingAssignment({...editingAssignment, priority: value})}
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
            value={editingAssignment.description}
            onChange={(e) => setEditingAssignment({...editingAssignment, description: e.target.value})}
            className="col-span-3"
          />
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium">Tasks</h4>
          {editingAssignment.tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`text-sm flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
              >
                {task.description}
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Add new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={addTask}>Add</Button>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button onClick={saveChanges}>Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditAssignmentDialog;