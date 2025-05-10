import { Component, Input } from '@angular/core';
import { TodoPriority, TodoStatus } from 'src/app/proxy';
import { TodoDto } from 'src/app/proxy/dtos/todo';

@Component({
  standalone: false,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() todoList: TodoDto[] = [];
  TodoStatus = TodoStatus;
  TodoPriority = TodoPriority;

  constructor() { }

  trackById(_: number, item: TodoDto): string {
    return item.id;
  }

  getStatusBadgeClass(status: TodoStatus): string {
    switch (status) {
      case TodoStatus.Pending:
        return 'badge bg-warning';
      case TodoStatus.InProgress:
        return 'badge bg-primary';
      case TodoStatus.Completed:
        return 'badge bg-success';
      default:
        return '';
    }
  }

  getPriorityBadgeClass(priority: TodoPriority): string {
    switch (priority) {
      case TodoPriority.Low:
        return 'badge bg-success';
      case TodoPriority.Medium:
        return 'badge bg-warning';
      case TodoPriority.High:
        return 'badge bg-danger';
      default:
        return '';
    }
  }
}
