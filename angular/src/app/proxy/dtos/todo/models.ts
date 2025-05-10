import type { TodoStatus } from '../../todo-status.enum';
import type { TodoPriority } from '../../todo-priority.enum';

export interface TodoDto {
  id?: string;
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
}
