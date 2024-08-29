import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter, SortDesc } from 'lucide-react';
import AddAssignmentDialog from './add-assignment-dialog';
import { Courses, Assignment } from '@/types';
import SortDropdown from './sort-dropdown';

interface HeaderProps {
  courses: Courses[];
  onAddAssignment: (assignment: Assignment) => void;
  onSort: (sortBy: string) => void;
}

const Header = ({ courses, onAddAssignment, onSort }: HeaderProps) => {
  return (
    <div className="flex justify-between pb-4 w-full">
      <h1 className="text-3xl font-semibold">Assignments</h1>
      <div>
        <div className="flex items-center space-x-4">
          <SortDropdown onSort={onSort} />
          <AddAssignmentDialog courses={courses} onAddAssignment={onAddAssignment} />
        </div>
      </div>
    </div>
  );
};

export default Header;
