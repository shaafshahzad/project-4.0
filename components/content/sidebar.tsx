"use client";

import React, { useState, useEffect } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import SidebarContent from "./sidebar-content";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { useCourses } from "@/lib/hooks/use-courses";

const Sidebar = () => {
	const [isLargeScreen, setIsLargeScreen] = useState(false);
	const router = useRouter();
	const user = useAuth(router);
	const courses = useCourses(user);

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
				<SidebarContent courses={courses} />
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
					<SheetContent side={"left"} className="h-full">
						<SidebarContent courses={courses} />
					</SheetContent>
				</Sheet>
			)}
		</>
	);
};

export default Sidebar;
