"use client";

import React, { useState, useEffect } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import SidebarContent from "./sidebar-content";
import { AccessToken } from "@/types";

const Sidebar = ({ accessToken }: AccessToken) => {
	const [isLargeScreen, setIsLargeScreen] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsLargeScreen(window.innerWidth >= 1024);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	return (
		<>
			{isLargeScreen ? (
				<div className="h-full overflow-hidden p-6 w-96 border-r">
					<SidebarContent accessToken={accessToken} />
				</div>
			) : (
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="fixed right-8 top-20 border-0 bg-transparent dark:hover:bg-foreground/50"
						>
							<HamburgerMenuIcon
								style={{
									width: "19.2px",
									height: "19.2px",
								}}
							/>
						</Button>
					</SheetTrigger>
					<SheetContent side={"left"} className="w-80 h-full overflow-hidden">
						<SidebarContent accessToken={accessToken} />
					</SheetContent>
				</Sheet>
			)}
		</>
	);
};

export default Sidebar;
