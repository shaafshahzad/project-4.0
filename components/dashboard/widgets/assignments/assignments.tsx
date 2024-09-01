import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/hooks/use-auth";
import { useAssignments } from "@/lib/hooks/use-assignment";
import { useRouter } from "next/navigation";
import AssignmentCard from "./assignment-card";

const Content = () => {
  const router = useRouter();
  const user = useAuth(router);
  const assignments = useAssignments(user?.uid);

  const sortedAssignments = assignments.sort((a, b) => {
    const dateComparison = a.dueDate.getTime() - b.dueDate.getTime();
    if (dateComparison !== 0) return dateComparison;
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Card className="flex flex-col col-span-3 row-start-2 overflow-hidden">
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        {sortedAssignments.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {sortedAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No upcoming tasks</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Content;
