import { Component, OnInit } from '@angular/core';
import { TodoDto, TodoQueryDto } from '../proxy/dtos/todo';
import { TodoService } from '../proxy';
import { ToasterService } from '@abp/ng.theme.shared';
import { AsyncComponent } from '../shared/classes/async-component.interface';
import { TodoFormService } from './todo/form/todo-form.service';
import { TodoFormOutput, TodoStatusUpdatedOutput } from '../shared/interfaces';
import { NavigatorService } from '../shared/services/navigator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends AsyncComponent implements OnInit {
  todoList: TodoDto[] = [];

  constructor(
    private readonly navigatorService: NavigatorService,
    private readonly route: ActivatedRoute,
    private readonly toast: ToasterService,
    private readonly todoService: TodoService,
    public readonly todoFormService: TodoFormService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeToRouteParams();
  }

  openAddForm() {
    this.todoFormService.open();
  }

  openEditForm(todoId: string) {
    this.todoFormService.open(todoId);
  }

  updateTodoList(todoFormOutput: TodoFormOutput) {
    if (todoFormOutput.isEdit) {
      this.todoList = this.todoList.map(todo => {
        if (todo.id === todoFormOutput.todo.id) {
          return { ...todoFormOutput.todo };
        }
        return todo;
      });
    } else {
      this.todoList.push(todoFormOutput.todo);
    }
    this.filterTodoItemsAfterUpdate();
  }

  updateTodoStatus(payload: TodoStatusUpdatedOutput) {
    this.todoList = this.todoList.map(todo => {
      if (todo.id === payload.id) {
        return { ...todo, status: payload.status };
      }
      return todo;
    });
    this.filterTodoItemsAfterUpdate();
    this.toast.success('Todo status has been updated successfully');
  }

  deleteTodo(id: string): void {
    this.isLoading = true;
    this.todoService.delete(id).subscribe({
      next: () => {
        this.todoList = this.todoList.filter(todo => todo.id !== id);
        this.toast.success('Todo has been deleted successfully');
        this.isLoading = false;
      },
      error: () => {
        this.toast.error('Error occurred while deleting todo');
        this.isLoading = false;
      },
    });
  }

  private subscribeToRouteParams() {
    this.route.queryParams.subscribe(params => {
      this.getList({
        priority: params['priority'] || null,
        status: params['status'] || null,
      });
    });
  }

  private getList(params: TodoQueryDto): void {
    this.isLoading = true;
    this.todoService.getList(params).subscribe({
      next: data => {
        this.todoList = data;
        this.isLoading = false;
      },
      error: () => {
        this.toast.error('Error occurred while loading todo list');
        this.isLoading = false;
      },
    });
  }

  private filterTodoItemsAfterUpdate(): void {
    this.todoList = this.todoList.filter(
      todo =>
        !(
          this.navigatorService.todoQueryParams.status &&
          todo.status != this.navigatorService.todoQueryParams.status
        ) &&
        !(
          this.navigatorService.todoQueryParams.priority &&
          todo.priority != this.navigatorService.todoQueryParams.priority
        ),
    );
  }
}
