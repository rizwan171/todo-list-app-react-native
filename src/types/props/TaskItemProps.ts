import { Task } from "../model/Task";

export interface TaskItemProps {
  task: Task;
  index: number;
  completeTask: (index: number) => void;
}
