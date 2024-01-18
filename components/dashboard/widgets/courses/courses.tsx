import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import CourseList from "./course-list";
import PdfUpload from "./pdf-upload";

const Courses = () => {
    return (
        <Card className="flex flex-col col-span-2">
            <CardHeader>
                <CardTitle>Your courses</CardTitle>
                <CardDescription>
                    Upload your course outlines or add them manually
                </CardDescription>
            </CardHeader>
            <CardContent className="h-full flex flex-col justify-between">
                <CourseList />
                <PdfUpload />
            </CardContent>
        </Card>
    );
};

export default Courses;
