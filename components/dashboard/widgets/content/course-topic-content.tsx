import React from "react";
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

const CourseTopicContent = ({ selectedCourse }: SelectedCourseProps) => {
  const router = useRouter();
  const user = useAuth(router);
  const courses = useCourses(user);
  const course = courses.find((course) => course.name === selectedCourse);
  const topics = course?.topics;

  return (
    <div className="w-full h-full flex justify-center">
      <Carousel className="w-[90%] h-full">
        <CarouselContent>
          {topics &&
            Object.keys(topics)
              .sort((a, b) => {
                const topicANumber = parseInt(a.replace("Topic ", ""));
                const topicBNumber = parseInt(b.replace("Topic ", ""));
                return topicANumber - topicBNumber;
              })
              .map((topic) => (
                <CarouselItem key={topic}>
                  <h1 className="text-3xl font-semibold">{topic}</h1>
                  <p className="text-lg">{topics[topic]}</p>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CourseTopicContent;
