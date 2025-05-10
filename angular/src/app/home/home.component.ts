import { Component, OnInit } from '@angular/core';
import { TodoDto } from '../proxy/dtos/todo';
import { TodoService } from '../proxy';
import { ToasterService } from '@abp/ng.theme.shared';
import { AsyncComponent } from '../shared/classes/async-component.interface';
import { TodoFormService } from './todo/form/todo-form.service';
import { TodoFormOutput } from '../shared/interfaces';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends AsyncComponent implements OnInit {
  todoList: TodoDto[] = [];

  constructor(
    private readonly toast: ToasterService,
    public readonly todoFormService: TodoFormService,
    private readonly todoService: TodoService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.todoService.getList().subscribe({
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
}
