import React from "react";
import AddTaskForm from "./add-task-form";
import { AccessToken } from "@/types";
import AddEventForm from "./add-event-form";

const SidebarContent = ({ accessToken }: AccessToken) => {
  return (
    <div className="w-full max-w-xs lg:border-r flex justify-evenly flex-col">
      <div className="w-full max-w-xs flex flex-col items-center p-6">
        <p className="text-2xl font-bold">Add Task</p>
        <AddTaskForm accessToken={accessToken} />
      </div>
      <div className="w-full max-w-xs flex flex-col items-center p-6">
        <p className="text-2xl font-bold">Add Event</p>
        <AddEventForm accessToken={accessToken} />
      </div>
    </div>
  );
};

export default SidebarContent;
