import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CardContent } from "../ui/card";

interface Grading {
	[assignment: string]: {
		mark: string;
		weight: string;
	};
}

interface GradesCardContentProps {
	marks: Grading;
	sortedGrading: [string, { mark: string; weight: string }][];
	handleAddMark: (
		assignment: string
	) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSaveMark: (assignment: string) => void;
}

const GradesCardContent = ({
	marks,
	sortedGrading,
	handleAddMark,
	handleSaveMark,
}: GradesCardContentProps) => (
	<CardContent className="h-full flex flex-col w-[95%] overflow-auto my-2 p-0">
		<div className="w-full flex justify-between text-xs pb-2 mb-2 border-b sticky top-0 bg-card z-10">
			<Label>Assignment</Label>
			<div className="flex w-1/2 justify-end gap-2">
				<Label className="w-1/2 text-center">Grade (%)</Label>
				<Label className="w-1/2 text-center">Weight (%)</Label>
			</div>
		</div>
		<div className="w-full flex flex-col justify-between">
			{sortedGrading.map(([assignment, { weight }]) => (
				<div key={assignment} className="w-full flex justify-between">
					<Label className="text-xs max-w-[45%]">{assignment}</Label>
					<div className="w-1/2 flex justify-end gap-4">
						<Input
							placeholder="Add Mark"
							type="number"
							min={0}
							max={100}
							value={marks[assignment]?.mark || ""}
							className="w-1/2 h-1/2 text-xs text-center truncate"
							onChange={handleAddMark(assignment)}
							onBlur={() => handleSaveMark(assignment)}
						/>
						<Input
							disabled
							placeholder={weight}
							className="w-1/2 h-1/2 text-xs text-center truncate"
						/>
					</div>
				</div>
			))}
		</div>
	</CardContent>
);

export default GradesCardContent;
