import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCourseColor(courseName: string): string {
  const colors = [
    'hsl(0, 80%, 75%)',  
    'hsl(120, 70%, 70%)',
    'hsl(240, 80%, 75%)',
    'hsl(60, 90%, 75%)', 
    'hsl(300, 70%, 75%)',
    'hsl(180, 70%, 70%)',
    'hsl(30, 90%, 75%)', 
    'hsl(150, 70%, 70%)',
    'hsl(330, 80%, 75%)',
  ];

  let hash = 0;
  for (let i = 0; i < courseName.length; i++) {
    hash = courseName.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}
