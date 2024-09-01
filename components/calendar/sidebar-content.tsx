import React from "react";
import AddTaskForm from "./add-task-form";
import { AccessToken } from "@/types";
import AddEventForm from "./add-event-form";

const SidebarContent = ({ accessToken }: AccessToken) => {
  return (
    <div className="w-full flex flex-col justify-between h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full flex flex-col items-center mb-6 pb-6">
          <p className="text-2xl font-bold mb-4">Add Task</p>
          <AddTaskForm accessToken={accessToken} />
        </div>
        <div className="w-full flex flex-col items-center mt-6">
          <p className="text-2xl font-bold mb-4">Add Event</p>
          <AddEventForm accessToken={accessToken} />
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
