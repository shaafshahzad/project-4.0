"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { useCourses } from "@/lib/hooks/use-courses";

const Exams = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuth(router);
  const courses = useCourses(user);

  return (
    <div className="flex flex-col px-11 py-6 h-[calc(100%-73px)]">
      <div className="flex justify-between pb-4">
        <h1 className="text-3xl font-semibold">Exams</h1>
      </div>
<p> this is the exams page</p>
    </div>
  );
};

export default Exams;
