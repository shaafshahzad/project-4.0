import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectValue,
	SelectItem,
	SelectLabel,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import React from "react";

const Content = () => {
	return (
		<Card className="flex flex-col col-span-3 row-start-2">
			<CardHeader>
				<CardTitle>Content in</CardTitle>
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Week..." />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Week</SelectLabel>
							<SelectItem value="Light">Week One</SelectItem>
							<SelectItem value="Dark">Week Two</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</CardHeader>
		</Card>
	);
};

export default Content;
