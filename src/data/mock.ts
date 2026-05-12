import type { Task } from "../types";

export const initialTasks: Task[] = [
  { id: '1', title: 'Implement Dark Mode', project: 'Web App Redesign', tag: 'Feature', priority: 'Medium', date: 'Oct 28', status: 'To Do', progress: 0, assignees: ['https://i.pravatar.cc/150?u=1'] },
  { id: '2', title: 'Implement Dark Mode Toggle', project: 'Web App Redesign', tag: 'Feature', priority: 'Medium', date: 'Oct 28', status: 'In Progress', progress: 45, assignees: ['https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3'] },
  { id: '3', title: 'Promise clear determination', project: 'Web App Redesign', tag: 'Feature', priority: 'High', date: 'Oct 28', status: 'Done', progress: 100, assignees: ['https://i.pravatar.cc/150?u=4'] },
  { id: '4', title: 'Implement compliance', project: 'Web App Redesign', tag: 'Feature', priority: 'Low', date: 'Oct 28', status: 'To Do', progress: 0, assignees: ['https://i.pravatar.cc/150?u=5'] },
  { id: '5', title: 'Refactor UI components', project: 'Web App Redesign', tag: 'Feature', priority: 'High', date: 'Oct 29', status: 'In Progress', progress: 60, assignees: ['https://i.pravatar.cc/150?u=1'] },
  { id: '6', title: 'Write unit tests', project: 'Web App Redesign', tag: 'QA', priority: 'Medium', date: 'Oct 30', status: 'To Do', progress: 0, assignees: ['https://i.pravatar.cc/150?u=2'] },
];