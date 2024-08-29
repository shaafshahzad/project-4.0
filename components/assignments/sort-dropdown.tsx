import React from 'react';
import { Button } from "@/components/ui/button";
import { SortDesc } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortDropdownProps {
  onSort: (sortBy: string) => void;
}

const SortDropdown = ({ onSort }: SortDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SortDesc className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onSort('dueDate')}>Due Date</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort('priority')}>Priority</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort('course')}>Course</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort('status')}>Status</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;