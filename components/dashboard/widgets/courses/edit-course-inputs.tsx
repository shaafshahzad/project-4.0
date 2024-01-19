import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { AlertDialogDescription } from "@/components/ui/alert-dialog";

// TODO: Add functionality to edit course details

interface EditCourseInputsProps {
	course: {
		name: string;
		grading: { [key: string]: string };
		weeklyTopics: { [key: string]: string };
	};
}

const EditCourseInputs = ({ course }: EditCourseInputsProps) => {
	const [name, setName] = React.useState(course.name);
	const [grading, setGrading] = React.useState(course.grading);
	const [weeklyTopics, setWeeklyTopics] = React.useState(course.weeklyTopics);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleGradingKeyChange = () => {};

	const handleGradingValueChange = () => {};

	const handleWeeklyTopicsChange = () => {};

	return (
		<AlertDialogDescription className="space-y-4 overflow-auto h-96">
			<div>
				<Label className="mb-2">Course Name</Label>
				<Input value={name} onChange={handleNameChange} />
			</div>
			<div>
				<Label>Grading</Label>
				<div className="space-y-2">
					{Object.entries(grading).map(([key, value], index) => (
						<div key={index} className="flex gap-2">
							<Input
								value={key}
								className="w-3/4"
								onChange={handleGradingKeyChange}
							/>
							<Input
								value={value}
								className="w-1/4"
								onChange={handleGradingValueChange}
							/>
						</div>
					))}
				</div>
			</div>
			<div>
				<Label>Weekly Topics</Label>
				<div className="space-y-2">
					{Object.entries(weeklyTopics).map(([key, value], index) => (
						<div key={index} className="gap-2">
							<Label>{key}</Label>
							<Input
								value={value}
								onChange={handleWeeklyTopicsChange}
							/>
						</div>
					))}
				</div>
			</div>
		</AlertDialogDescription>
	);
};

export default EditCourseInputs;
