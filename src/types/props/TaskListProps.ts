import { Task } from "../model/Task";

export interface TaskListProps {
  tasks: Task[];
  completeTask: (index: number) => void;
}
