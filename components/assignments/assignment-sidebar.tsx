import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Assignment, Courses, FilterOptions } from '@/types';

const AssignmentSidebar = ({ assignments, courses, onFilterChange }: { assignments: Assignment[], courses: Courses[], onFilterChange: (filters: FilterOptions) => void }) => {
    const [selectedCourse, setSelectedCourse] = useState<string>("All Courses");
    const [selectedStatus, setSelectedStatus] = useState<string>("All Statuses");
    const [selectedPriority, setSelectedPriority] = useState<string>("All Priorities");

    const tasksDueToday = assignments
      .filter(assignment => {
        const today = new Date();
        return assignment.dueDate.toDateString() === today.toDateString();
      })
      .sort((a, b) => {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

    useEffect(() => {
        const newFilters: FilterOptions = {
            course: selectedCourse === "All Courses" ? null : selectedCourse,
            status: selectedStatus === "All Statuses" ? null : selectedStatus,
            priority: selectedPriority === "All Priorities" ? null : selectedPriority,
        };
        onFilterChange(newFilters);
    }, [selectedCourse, selectedStatus, selectedPriority]);

    const resetFilters = () => {
        setSelectedCourse("All Courses");
        setSelectedStatus("All Statuses");
        setSelectedPriority("All Priorities");
    };

    return (
        <div className="w-96 border-l pl-11 py-6 pr-2 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-center">Quick Filters</h2>
            <div className="space-y-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            <span className="truncate">{selectedCourse}</span>
                            <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem onSelect={() => setSelectedCourse("All Courses")}>All Courses</DropdownMenuItem>
                        {courses.map((course) => (
                            <DropdownMenuItem key={course.name} onSelect={() => setSelectedCourse(course.name)}>
                                <span className="truncate">{course.name}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {selectedStatus}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem onSelect={() => setSelectedStatus("All Statuses")}>All Statuses</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedStatus("Not Started")}>Not Started</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedStatus("In Progress")}>In Progress</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedStatus("Completed")}>Completed</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {selectedPriority}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem onSelect={() => setSelectedPriority("All Priorities")}>All Priorities</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedPriority("High")}>High</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedPriority("Medium")}>Medium</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedPriority("Low")}>Low</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button className="w-full" onClick={resetFilters}>
                    Reset Filters
                </Button>
            </div>
            <h2 className="text-lg font-semibold mb-4 mt-6 text-center">Tasks Due Today</h2>
            <div className="space-y-4">
                {tasksDueToday.length > 0 ? (
                    tasksDueToday.map((task) => (
                        <div key={task.id} className="border p-3 rounded-lg">
                            <h3 className="font-medium text-sm">{task.title}</h3>
                            <p className="text-xs">{task.course}</p>
                            <div className="flex justify-between items-center mt-2">
                                <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'secondary'}>
                                    {task.priority}
                                </Badge>
                                <span className="text-xs font-medium">{task.status}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-sm">No tasks due today</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignmentSidebar;