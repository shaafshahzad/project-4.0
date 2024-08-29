import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter, SortDesc } from 'lucide-react';
import AddAssignmentDialog from './add-assignment-dialog';
import { Courses, Assignment } from '@/types';

interface HeaderProps {
  courses: Courses[];
  onAddAssignment: (assignment: Assignment) => void;
}

const Header = ({ courses, onAddAssignment }: HeaderProps) => {
  return (
    <div className="flex justify-between pb-4 w-full">
      <h1 className="text-3xl font-semibold">Assignments</h1>
      <div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <SortDesc className="h-4 w-4" />
          </Button>
          <AddAssignmentDialog courses={courses} onAddAssignment={onAddAssignment} />
        </div>
      </div>
    </div>
  );
};

export default Header;
