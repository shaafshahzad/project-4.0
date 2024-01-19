import React from "react";

interface CourseItemProps {
    name: string;
}

const CourseItem = ({ name }: CourseItemProps) => {
    return (
        <div className="flex gap-2">
            <h1>{name}</h1>
        </div>
    );
};

export default CourseItem;
