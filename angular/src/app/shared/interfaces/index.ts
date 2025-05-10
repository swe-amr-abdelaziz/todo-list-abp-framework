import { TodoStatus } from 'src/app/proxy';
import { TodoDto } from 'src/app/proxy/dtos/todo';

export interface TodoFormOutput {
  isEdit: boolean;
  todo: TodoDto;
}

export interface TodoStatusUpdatedOutput {
  id: string;
  status: TodoStatus;
}
