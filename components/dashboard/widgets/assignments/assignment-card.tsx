import React from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { generateCourseColor } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Assignment } from "@/types";

const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
    const courseColor = generateCourseColor(assignment.course);
  
    return (
        <div className="border rounded-lg p-4 flex flex-row h-full">
            <div className="w-1/2 mb-2">
                    <h3 className="font-semibold">{assignment.title}</h3>
                    <p className="text-sm truncate" style={{ color: courseColor }}>{assignment.course}</p>
                <p className="text-sm text-gray-600">{format(assignment.dueDate, "PPP")}</p>
                <p className="text-sm text-gray-600">{assignment.status}</p>
                <Badge variant={assignment.priority === 'High' ? 'destructive' : assignment.priority === 'Medium' ? 'default' : 'secondary'}>
                {assignment.priority}
                </Badge>
            </div>
            <div className={`border-l pl-4 w-1/2 ${!assignment.description && assignment.tasks.length === 0 ? 'flex items-center justify-center' : ''}`}>
                {assignment.description || assignment.tasks.length > 0 ? (
                <>
                    {assignment.description && (
                    <div className="mb-2">
                        <p className="text-sm">{assignment.description}</p>
                        </div>
                    )}
                    {assignment.tasks.length > 0 && (
                    <div>
                        {assignment.tasks.map((task) => (
                        <div key={task.id} className="flex items-center space-x-2 mb-1">
                            <Checkbox checked={task.completed} className="pointer-events-none" />
                            <label className="text-sm">{task.description}</label>
                        </div>
                        ))}
                    </div>
                    )}
                </>
                ) : (
                <p className="text-center text-gray-500">No description or tasks</p>
                )}
            </div>
        </div>
    );
};

export default AssignmentCard;