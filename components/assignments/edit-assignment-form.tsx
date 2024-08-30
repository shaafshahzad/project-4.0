import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon, Trash2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Assignment, Courses } from '@/types';
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  course: z.string({
    required_error: "Please select a course.",
  }),
  title: z.string({
    required_error: "Please enter a title for the assignment.",
  }),
  dueDate: z.date({
    required_error: "Please select a due date.",
  }),
  status: z.enum(['Not Started', 'In Progress', 'Completed'], {
    required_error: "Please select a status.",
  }),
  priority: z.enum(['High', 'Medium', 'Low'], {
    required_error: "Please select a priority level.",
  }),
  description: z.string().optional(),
  tasks: z.array(z.object({
    id: z.number(),
    description: z.string(),
    completed: z.boolean(),
  })),
});

interface EditAssignmentFormProps {
  assignment: Assignment;
  courses: Courses[];
  onSaveChanges: (updatedAssignment: Assignment) => void;
  setOpen: (open: boolean) => void;
}

const EditAssignmentForm = ({ assignment, courses, onSaveChanges, setOpen }: EditAssignmentFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      course: assignment.course,
      title: assignment.title,
      dueDate: new Date(assignment.dueDate),
      status: assignment.status as 'Not Started' | 'In Progress' | 'Completed',
      priority: assignment.priority,
      description: assignment.description,
      tasks: assignment.tasks.map(task => ({
        id: task.id,
        description: task.description,
        completed: task.completed
      })),
    },
  });

  const [newTask, setNewTask] = React.useState('');

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const updatedAssignment: Assignment = {
      ...assignment,
      ...values,
      progress: calculateProgress(values.tasks),
    };
    onSaveChanges(updatedAssignment);
    setOpen(false);
  }

  const calculateProgress = (tasks: { completed: boolean }[]) => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTasks = [...form.getValues('tasks'), { id: Date.now(), description: newTask, completed: false }];
    form.setValue('tasks', newTasks);
    setNewTask('');
  };

  const deleteTask = (taskId: number) => {
    const newTasks = form.getValues('tasks').filter(task => task.id !== taskId);
    form.setValue('tasks', newTasks);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.name} value={course.name}>{course.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter assignment title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter assignment description (optional)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h4 className="mb-4 text-sm font-medium">Tasks</h4>
          {form.watch('tasks').map((task) => (
            <div key={task.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={(checked) => {
                  const newTasks = form.getValues('tasks').map(t =>
                    t.id === task.id ? { ...t, completed: checked as boolean } : t
                  );
                  form.setValue('tasks', newTasks);

                  const currentStatus = form.getValues('status');
                  const allTasks = form.getValues('tasks');
                  const anyTaskCompleted = allTasks.some(t => t.completed);
                  const allTasksCompleted = allTasks.every(t => t.completed);

                  if (currentStatus === 'Not Started' && anyTaskCompleted) {
                    form.setValue('status', 'In Progress');
                  } else if (allTasksCompleted) {
                    form.setValue('status', 'Completed');
                  } else if (currentStatus === 'Completed' && !allTasksCompleted) {
                    form.setValue('status', 'In Progress');
                  }

                  const completedTasks = allTasks.filter(t => t.completed).length;
                  const progress = Math.round((completedTasks / allTasks.length) * 100);
                }}
              />
              <label
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
          <Button type="button" onClick={addTask}>Add</Button>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
};

export default EditAssignmentForm;