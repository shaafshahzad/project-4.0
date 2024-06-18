"use client";

import React, { useEffect } from "react";
import CourseGrades from "@/components/grades/course-grades";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useCourses } from "@/lib/hooks/use-courses";
import AddCourse from "@/components/dashboard/widgets/courses/add-course";

const Grades = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuth(router);
  const courses = useCourses(user);

  return (
    <div className="flex flex-col px-11 py-6 h-[calc(100%-73px)]">
      <div className="flex justify-between pb-4">
        <h1 className="text-3xl font-semibold">Grades</h1>
      </div>
      <div className="h-full grid lg:grid-cols-3 sm:grid-cols-2 auto-rows-[49%] gap-2 overflow-auto">
        {courses.map((course, index) => (
          <CourseGrades key={index} course={course} userId={user?.uid} />
        ))}
        <AddCourse pathname={pathname} />
      </div>
    </div>
  );
};

export default Grades;
