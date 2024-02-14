import React from "react";
import AddTaskForm from "./add-task-form";
import { AccessToken } from "@/types";

const SidebarContent = ({ accessToken }: AccessToken) => {
	return (
		<div className="w-full max-w-xs h-full lg:border-r flex flex-col items-center p-6">
			<p className="text-2xl font-bold">Add Task</p>
			<AddTaskForm accessToken={accessToken} />
		</div>
	);
};

export default SidebarContent;
