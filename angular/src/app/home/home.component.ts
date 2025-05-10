import { Component, OnInit } from '@angular/core';
import { TodoDto } from '../proxy/dtos/todo';
import { TodoService } from '../proxy';
import { ToasterService } from '@abp/ng.theme.shared';
import { AsyncComponent } from '../shared/classes/async-component.interface';

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
