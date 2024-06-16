import Sidebar from "@/components/content/sidebar";
import React from "react";

const Content = () => {
	return (
		<div className="flex flex-col h-[calc(100%-73px)]">
			<Sidebar />
		</div>
	);
};

export default Content;
