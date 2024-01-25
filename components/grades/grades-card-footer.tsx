import React from "react";
import { CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface GradesCardFooterProps {
	currentGrade: number;
	totalGrade: number;
	passOrFail: (grade: number) => boolean;
}

const GradesCardFooter = ({
	currentGrade,
	totalGrade,
	passOrFail,
}: GradesCardFooterProps) => (
	<CardFooter className="flex flex-col items-start w-[95%] px-0 pb-2">
		<div className="w-full flex justify-between">
			<Label className="text-xs">Current Grade</Label>
			<Input
				value={currentGrade.toFixed(2)}
				readOnly
				placeholder="0"
				className={`w-1/2 h-1/2 text-xs text-center truncate pointer-events-none ${
					passOrFail(currentGrade)
						? "text-green-50 bg-green-600"
						: "text-red-50 bg-red-600"
				}`}
			/>
		</div>
		<div className="w-full flex justify-between">
			<Label className="text-xs">Total Grade</Label>
			<Input
				value={totalGrade.toFixed(2)}
				readOnly
				placeholder="0"
				className={`w-1/2 h-1/2 text-xs text-center truncate pointer-events-none ${
					passOrFail(totalGrade)
						? "text-green-50 bg-green-600"
						: "text-red-50 bg-red-600"
				}`}
			/>
		</div>
	</CardFooter>
);

export default GradesCardFooter;
