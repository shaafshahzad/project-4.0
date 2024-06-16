import React, { useEffect } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { useCourses } from "@/lib/hooks/use-courses";

interface SelectedCourseProps {
	selectedCourse: string;
}

const CourseWeeklyContent = ({ selectedCourse }: SelectedCourseProps) => {
	const router = useRouter();
	const user = useAuth(router);
	const courses = useCourses(user);
	const course = courses.find((course) => course.name === selectedCourse);
	const weeklyTopics = course?.weeklyTopics;

	return (
		<div className="w-full h-full flex justify-center">
			<Carousel className="w-[90%] h-full">
				<CarouselContent>
					{weeklyTopics &&
						Object.keys(weeklyTopics)
							.sort((a, b) => {
								const weekANumber = parseInt(
									a.replace("Week ", "")
								);
								const weekBNumber = parseInt(
									b.replace("Week ", "")
								);
								return weekANumber - weekBNumber;
							})
							.map((week) => (
								<CarouselItem key={week}>
									<h1 className="text-3xl font-semibold">
										{week}
									</h1>
									<p className="text-lg">
										{weeklyTopics[week]}
									</p>
								</CarouselItem>
							))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};

export default CourseWeeklyContent;
