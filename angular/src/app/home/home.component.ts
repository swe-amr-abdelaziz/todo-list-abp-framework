import { Component, OnInit } from '@angular/core';
import { TodoDto } from '../proxy/dtos/todo';
import { TodoService } from '../proxy';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todoList: TodoDto[] = [];

  constructor(
    private readonly toast: ToasterService,
    private readonly todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.todoService.getList().subscribe(todoList => {
      this.todoList = todoList;
    });
  }

  deleteTodo(id: string): void {
    this.todoService.delete(id).subscribe(() => {
      this.todoList = this.todoList.filter(todo => todo.id !== id);
      this.toast.success('Todo has been deleted successfully');
    });
  }
}
