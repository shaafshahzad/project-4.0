import React from "react";
import CourseItem from "./course-item";

const example = [
    {
        id: 1,
        name: "CSC 101",
        description: "Introduction to Computer Science",
    },
    {
        id: 2,
        name: "CSC 202",
        description: "Introduction to Python",
    },
    {
        id: 3,
        name: "CSC 402",
        description: "Data Structures and Algorithms",
    },
];

const CourseList = () => {
    return (
        <div>
            {example.map((course) => (
                <CourseItem
                    name={course.name}
                    description={course.description}
                />
            ))}
        </div>
    );
};

export default CourseList;
