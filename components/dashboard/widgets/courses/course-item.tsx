import React from "react";

interface CourseItemProps {
    name: string;
    description: string;
}

const CourseItem = ({ name, description }: CourseItemProps) => {
    return (
        <div className="flex gap-2">
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    );
};

export default CourseItem;
