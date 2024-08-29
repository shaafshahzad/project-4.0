type TODO = any;

export interface AccessToken {
  accessToken: string;
}

export interface Courses {
  name: string;
  grading: {
    [assignment: string]: {
      mark: string;
      weight: string;
    };
  };
  topics: { [week: string]: string };
}

export type Task = {
  id: number;
  description: string;
  completed: boolean;
}

export type Assignment = {
  id: string;
  course: string;
  title: string;
  dueDate: Date;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  progress: number;
  description: string;
  tasks: Task[];
  notificationEnabled: boolean;
}

export interface FilterOptions {
  course: string | null;
  status: string | null;
  priority: string | null;
}