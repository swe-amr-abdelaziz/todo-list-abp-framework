import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoPriority, TodoService, TodoStatus } from 'src/app/proxy';
import { TodoDto } from 'src/app/proxy/dtos/todo';
import { TodoFormService } from '../form/todo-form.service';
import { TodoStatusUpdatedOutput } from 'src/app/shared/interfaces';
import { AsyncComponent } from 'src/app/shared/classes/async-component.interface';
import { takeUntil } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent extends AsyncComponent {
  @Input() todoList: TodoDto[] = [];
  @Output() todoDeleted = new EventEmitter<string>();
  @Output() todoStatusUpdated = new EventEmitter<TodoStatusUpdatedOutput>();

  TodoStatus = TodoStatus;
  TodoPriority = TodoPriority;

  constructor(
    private readonly confirmation: ConfirmationService,
    private readonly todoFormService: TodoFormService,
    private readonly todoService: TodoService,
  ) {
    super();
  }

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

  updateTodoStatus(id: string, status: TodoStatus, title: string) {
    this.confirmation
      .info(
        `Are you sure you want to mark the todo of title: "${title}" as "${TodoStatus[status + 1]}" ?`,
        'Update Todo Status',
      )
      .subscribe(result => {
        if (result === Confirmation.Status.confirm) {
          this.todoService
            .updateStatus(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(newStatus => {
              this.todoStatusUpdated.emit({ id, status: newStatus });
            });
        }
      });
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
