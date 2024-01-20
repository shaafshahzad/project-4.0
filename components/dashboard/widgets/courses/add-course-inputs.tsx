import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";

// TODO: Add functionality to add course details and add them to firestore on save

const AddCourseInputs = () => {
	const [name, setName] = React.useState("");
	const [grading, setGrading] = React.useState([
		{ id: Date.now(), category: "", weight: "" },
	]);
	const [weeklyTopics, setWeeklyTopics] = React.useState([
		{ id: Date.now(), week: "", topic: "" },
	]);

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleGrading = (e: React.ChangeEvent<HTMLInputElement>) => {};

	const handleWeeklyTopic = (e: React.ChangeEvent<HTMLInputElement>) => {};

	const addGrading = () => {
		setGrading([...grading, { id: Date.now(), category: "", weight: "" }]);
	};

	const deleteGrading = (id: number) => {
		if (grading.length === 1) return;
		setGrading(grading.filter((item) => item.id !== id));
	};

	const addWeeklyTopic = () => {
		setWeeklyTopics([
			...weeklyTopics,
			{ id: Date.now(), week: "", topic: "" },
		]);
	};

	const deleteWeeklyTopic = (id: number) => {
		setWeeklyTopics(weeklyTopics.filter((item) => item.id !== id));
	};

	return (
		<AlertDialogDescription className="space-y-4 overflow-auto h-96">
			<div>
				<Label className="mb-2">Course Name</Label>
				<Input
					placeholder="Enter course name here"
					onChange={handleName}
				/>
			</div>
			<div>
				<Label>Grading</Label>
				<div className="space-y-2">
					{grading.map(({ id, category, weight }) => (
						<div key={id} className="flex gap-2 items-center">
							<Input
								placeholder="Category"
								onChange={handleGrading}
							/>
							<Input
								placeholder="Weight"
								onChange={handleGrading}
							/>
							<div className="hover:bg-red-100 dark:hover:bg-zinc-500 rounded-md duration-200 cursor-pointer p-1">
								<XCircleIcon
									size={24}
									onClick={() => deleteGrading(id)}
									color="#db2c2c"
								/>
							</div>
						</div>
					))}
					<Button className="w-full" onClick={addGrading}>
						Add Grading Criteria
					</Button>
				</div>
			</div>
			<div>
				<Label>Weekly Topics (leave nothing for 'none')</Label>
				<div className="space-y-2">
					{weeklyTopics.map(({ id, week, topic }, index) => (
						<div key={id} className="flex flex-col">
							<Label>Week {index + 1}</Label>
							<div className="flex flex-row items-center gap-2">
								<Input
									placeholder="Topic"
									onChange={handleWeeklyTopic}
								/>
								<div className="hover:bg-red-100 dark:hover:bg-zinc-500 rounded-md duration-200 cursor-pointer p-1">
									<XCircleIcon
										size={24}
										onClick={() => deleteWeeklyTopic(id)}
										color="#db2c2c"
									/>
								</div>
							</div>
						</div>
					))}
					<Button className="w-full" onClick={addWeeklyTopic}>
						Add Weekly Topic
					</Button>
				</div>
			</div>
		</AlertDialogDescription>
	);
};

export default AddCourseInputs;
