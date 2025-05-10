import { Component, OnInit } from '@angular/core';
import { TodoDto } from '../proxy/dtos/todo';
import { TodoService } from '../proxy';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todoList: TodoDto[] = [];

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getList().subscribe(todoList => {
      this.todoList = todoList;
    });
  }
}
