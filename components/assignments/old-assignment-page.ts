"use client";

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { isValid, format } from "date-fns"
import { PlusCircle, Filter, SortDesc, Edit2, Trash2, Bell, ChevronDown, CheckCircle2, Calendar as CalendarIcon } from 'lucide-react'
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { useCourses } from "@/lib/hooks/use-courses";
import { db } from "@/lib/firebase";
import { doc, setDoc, collection, query, onSnapshot, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";

type Task = {
    id: number;
    description: string;
    completed: boolean;
}

type Assignment = {
    id: string;
    course: string;
    title: string;
    dueDate: Date;
    status: string;
    priority: 'High' | 'Medium' | 'Low';
    progress: number;
    description: string;
    tasks: Task[];
}
    
const Assignments = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuth(router);
  const courses = useCourses(user);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    if (user) {
      const assignmentsRef = collection(db, "users", user.uid, "assignments");
      const q = query(assignmentsRef);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedAssignments: Assignment[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedAssignments.push({
            id: doc.id,
            ...data,
            dueDate: (data.dueDate instanceof Timestamp ? data.dueDate.toDate() : new Date(data.dueDate)) as Date,
          } as Assignment);
        });
        setAssignments(fetchedAssignments);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const [newTask, setNewTask] = useState('')
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    course: '',
    title: '',
    dueDate: new Date(),
    status: 'Not Started',
    priority: 'Medium',
    description: '',
  })

  const addTask = async (assignmentId: string) => {
    if (newTask.trim() === '') return;

    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    const newTasks = [...assignment.tasks, { id: Date.now(), description: newTask, completed: false }];
    const progress = Math.round((newTasks.filter(task => task.completed).length / newTasks.length) * 100);
    const newStatus = assignment.status === 'Completed' ? 'In Progress' : assignment.status;

    await updateAssignment(assignmentId, { tasks: newTasks, progress, status: newStatus });
    setNewTask('');

    // Update the editingAssignment state
    if (editingAssignment && editingAssignment.id === assignmentId) {
      setEditingAssignment({
        ...editingAssignment,
        tasks: newTasks,
        progress: progress,
        status: newStatus
      });
    }
  }

  const toggleTask = async (assignmentId: string, taskId: number) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    const newTasks = assignment.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    const allCompleted = newTasks.every(task => task.completed);
    const progress = Math.round((newTasks.filter(task => task.completed).length / newTasks.length) * 100);
    const newStatus = allCompleted ? 'Completed' : 'In Progress';

    await updateAssignment(assignmentId, { tasks: newTasks, progress, status: newStatus });

    if (editingAssignment && editingAssignment.id === assignmentId) {
      setEditingAssignment({
        ...editingAssignment,
        tasks: newTasks,
        progress: progress,
        status: newStatus
      });
    }
  };

  const toggleAllTasks = async (assignmentId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    const allCompleted = assignment.status === 'Completed';
    const newTasks = assignment.tasks.map(task => ({ ...task, completed: !allCompleted }));
    const newStatus = allCompleted ? 'In Progress' : 'Completed';
    const progress = allCompleted ? 0 : 100;

    await updateAssignment(assignmentId, { tasks: newTasks, progress, status: newStatus });

    if (editingAssignment && editingAssignment.id === assignmentId) {
      setEditingAssignment({
        ...editingAssignment,
        tasks: newTasks,
        progress: progress,
        status: newStatus
      });
    }
  };

  const addAssignment = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    if (newAssignment.course && newAssignment.title && newAssignment.dueDate) {
      const newAssignmentData = {
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

      try {
        await addAssignmentToDatabase(user.uid, newAssignmentData);
        setNewAssignment({
          course: '',
          title: '',
          dueDate: new Date(),
          status: 'Not Started',
          priority: 'Medium',
          description: '',
        });
      } catch (error) {
        console.error("Error adding assignment: ", error);
      }
    }
  }

  const updateAssignment = async (id: string, updatedFields: Partial<Assignment>) => {
    if (!user) return;
    const assignmentRef = doc(db, "users", user.uid, "assignments", id);
    await updateDoc(assignmentRef, updatedFields);

    // Update the assignments state
    setAssignments(prevAssignments => 
      prevAssignments.map(assignment => 
        assignment.id === id ? { ...assignment, ...updatedFields } : assignment
      )
    );

    // Update the editingAssignment state if it's the current assignment
    if (editingAssignment && editingAssignment.id === id) {
      setEditingAssignment(prev => prev ? { ...prev, ...updatedFields } : null);
    }
  }

  const deleteAssignment = async (id: string) => {
    if (!user) return;
    try {
      const assignmentRef = doc(db, "users", user.uid, "assignments", id);
      await deleteDoc(assignmentRef);
      console.log("Assignment deleted successfully");
    } catch (error) {
      console.error("Error deleting assignment: ", error);
    }
  };

  const addAssignmentToDatabase = async (userId: string, assignment: Assignment) => {
    const assignmentsRef = collection(db, "users", userId, "assignments");
    await setDoc(doc(assignmentsRef, assignment.id), assignment);
  };

  const saveChanges = async (updatedAssignment: Assignment) => {
    if (!user) return;
    const assignmentRef = doc(db, "users", user.uid, "assignments", updatedAssignment.id);
    
    let progress = updatedAssignment.progress;
    let tasks = updatedAssignment.tasks;

    // If status is changed from 'Completed' to something else, reset all task checks
    if (updatedAssignment.status !== 'Completed' && editingAssignment?.status === 'Completed') {
      tasks = tasks.map(task => ({ ...task, completed: false }));
      progress = 0;
    } else if (updatedAssignment.status === 'Completed') {
      tasks = tasks.map(task => ({ ...task, completed: true }));
      progress = 100;
    } else if (updatedAssignment.status === 'Not Started') {
      progress = 0;
    }

    try {
      await updateDoc(assignmentRef, {
        ...updatedAssignment,
        tasks: tasks,
        progress: progress
      });
      console.log("Assignment updated successfully");

      // Update the assignments state
      setAssignments(prevAssignments => 
        prevAssignments.map(assignment => 
          assignment.id === updatedAssignment.id 
            ? { ...assignment, ...updatedAssignment, tasks: tasks, progress: progress }
            : assignment
        )
      );

      // Update the editingAssignment state if it's still open
      if (editingAssignment && editingAssignment.id === updatedAssignment.id) {
        setEditingAssignment({
          ...updatedAssignment,
          tasks: tasks,
          progress: progress
        });
      }
    } catch (error) {
      console.error("Error updating assignment: ", error);
    }
  };

  const deleteTask = async (assignmentId: string, taskId: number) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    const newTasks = assignment.tasks.filter(task => task.id !== taskId);
    const progress = newTasks.length > 0 ? Math.round((newTasks.filter(task => task.completed).length / newTasks.length) * 100) : 0;

    await updateAssignment(assignmentId, { tasks: newTasks, progress });

    if (editingAssignment && editingAssignment.id === assignmentId) {
      setEditingAssignment({
        ...editingAssignment,
        tasks: newTasks,
        progress: progress
      });
    }
  };

  return (
    <div className="flex flex-col px-11 py-6 h-[calc(100%-73px)]">
      <div className="flex justify-between pb-4">
        <h1 className="text-3xl font-semibold">Assignments</h1>
        <div className="">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <SortDesc className="h-4 w-4" />
              </Button>
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
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="course" className="text-right">
                        Course
                      </Label>
                      <Select
                        value={newAssignment.course}
                        onValueChange={(value) => setNewAssignment({...newAssignment, course: value})}
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
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="dueDate" className="text-right">
                        Due Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`col-span-3 justify-start text-left font-normal ${!newAssignment.dueDate && "text-muted-foreground"}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Due: {newAssignment.dueDate ? format(newAssignment.dueDate, "PPP") : "Invalid Date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newAssignment.dueDate}
                            onSelect={(date) => setNewAssignment({...newAssignment, dueDate: date as Date})}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="priority" className="text-right">
                        Priority
                      </Label>
                      <Select
                        value={newAssignment.priority}
                        onValueChange={(value: 'High' | 'Medium' | 'Low') => setNewAssignment({...newAssignment, priority: value})}
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
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    <Button onClick={addAssignment}>Add Assignment</Button>
                    </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
      </div>

    {/* Assignment List */}
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignments.map((assignment) => (
                <Dialog key={assignment.id}>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex flex-col">
                        <CardTitle className="text-md font-medium">
                          {assignment.title}
                        </CardTitle>
                        <CardDescription className='text-xs'>
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
                          <DialogTrigger asChild onClick={() => {
                            setEditingAssignment(assignment);
                          }}>
                            <Button variant="outline" size="icon">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            </DialogTrigger>
                            <Button variant="outline" size="icon" onClick={() => deleteAssignment(assignment.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Bell className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button 
                            variant={assignment.status === 'Completed' ? "secondary" : "outline"} 
                            size="sm"
                            onClick={() => toggleAllTasks(assignment.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            {assignment.status === 'Completed' ? 'Mark Incomplete' : 'Mark Complete'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  <DialogContent className="sm:max-w-[425px]">
                    {editingAssignment && (
                      <>
                        <DialogHeader>
                          <DialogTitle>Edit Assignment</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor={`course-${editingAssignment.id}`} className="text-right">
                              Course
                            </Label>
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
                            <Label htmlFor={`title-${editingAssignment.id}`} className="text-right">
                              Title
                            </Label>
                            <Input
                              id={`title-${editingAssignment.id}`}
                              value={editingAssignment.title}
                              onChange={(e) => setEditingAssignment({...editingAssignment, title: e.target.value})}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor={`dueDate-${editingAssignment.id}`} className="text-right">
                              Due Date
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  id={`dueDate-${editingAssignment.id}`}
                                  variant={"outline"}
                                  className={`col-span-3 justify-start text-left font-normal`}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {editingAssignment.dueDate ? format(editingAssignment.dueDate, "PPP") : "Invalid Date"}
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
                            <Label htmlFor={`status-${editingAssignment.id}`} className="text-right">
                              Status
                            </Label>
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
                            <Label htmlFor={`priority-${editingAssignment.id}`} className="text-right">
                              Priority
                            </Label>
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
                            <Label htmlFor={`description-${editingAssignment.id}`} className="text-right">
                              Description
                            </Label>
                            <Textarea
                              id={`description-${editingAssignment.id}`}
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
                                  onCheckedChange={() => toggleTask(editingAssignment.id, task.id)}
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
                                  onClick={() => deleteTask(editingAssignment.id, task.id)}
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
                            <Button onClick={() => addTask(editingAssignment.id)}>Add</Button>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={() => {
                            saveChanges(editingAssignment);
                          }}>Save Changes</Button>
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </main>
      </div>
  );
};

export default Assignments;
