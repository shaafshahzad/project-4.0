import React from "react";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

const Footer = () => {
    return (
        <div className="flex items-center flex-row w-full text-center justify-between mb-4 font-medium text-gray-500 text-xs">
            <p>
                Project 4.0, developed by Shaaf Shahzad
            </p>
            <div className="flex items-center flex-row gap-4">
                <GithubOutlined className="cursor-pointer text-lg" onClick={() => window.open("https://github.com/shaafshahzad", "_blank")} />
                <LinkedinOutlined className="cursor-pointer text-lg" onClick={() => window.open("https://www.linkedin.com/in/shaafshahzad/", "_blank")} />
            </div>
        </div>
    );
}

export default Footer