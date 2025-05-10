import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoPriority, todoPriorityOptions, TodoStatus, todoStatusOptions } from 'src/app/proxy';
import { TodoQueryDto } from 'src/app/proxy/dtos/todo';
import { NavigatorService } from 'src/app/shared/services/navigator.service';

@Component({
  standalone: false,
  selector: 'app-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.scss'],
})
export class TodoFiltersComponent implements OnInit {
  todoQueryParams: TodoQueryDto;
  TodoStatus = TodoStatus;
  todoStatusOptions = todoStatusOptions;
  TodoPriority = TodoPriority;
  todoPriorityOptions = todoPriorityOptions;

  constructor(
    private readonly navigatorService: NavigatorService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.navigatorService.refresh();
    this.route.queryParams.subscribe(params => {
      this.todoQueryParams = {
        priority: params['priority'] || null,
        status: params['status'] || null,
      };
    });
  }

  onStatusChange(event: Event): void {
    const status = TodoStatus[(<HTMLInputElement>event.target).value];
    this.navigatorService.refresh({ status });
  }

  onPriorityChange(event: Event): void {
    const priority = TodoPriority[(<HTMLInputElement>event.target).value];
    this.navigatorService.refresh({ priority });
  }
}
