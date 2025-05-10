import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoPriority, TodoStatus } from 'src/app/proxy';
import { TodoDto } from 'src/app/proxy/dtos/todo';
import { TodoFormService } from '../form/todo-form.service';

@Component({
  standalone: false,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() todoList: TodoDto[] = [];
  @Output() todoDeleted = new EventEmitter<string>();

  TodoStatus = TodoStatus;
  TodoPriority = TodoPriority;

  constructor(
    private readonly confirmation: ConfirmationService,
    private readonly todoFormService: TodoFormService,
  ) {}

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

  openEditForm(id: string) {
    this.todoFormService.open(id);
  }

  deleteTodo(id: string, title: string): void {
    this.confirmation
      .warn(`Are you sure you want to delete the todo of title: "${title}" ?`, 'Delete Todo')
      .subscribe(result => {
        if (result === Confirmation.Status.confirm) {
          this.todoDeleted.emit(id);
        }
      });
  }
}
