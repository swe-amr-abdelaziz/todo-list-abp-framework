import type { TodoStatus } from '../../todo-status.enum';
import type { TodoPriority } from '../../todo-priority.enum';
import type { TodoSortBy } from './todo-sort-by.enum';

export interface CreateTodoDto {
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
}

export interface TodoDto {
  id?: string;
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
}

export interface TodoQueryDto {
  status?: TodoStatus;
  priority?: TodoPriority;
  sortBy?: TodoSortBy;
  sortDescending?: boolean;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
}
