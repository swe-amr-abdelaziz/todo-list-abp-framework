import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { TodoPriority, todoPriorityOptions, TodoStatus, todoStatusOptions } from 'src/app/proxy';
import { TodoQueryDto, TodoSortBy, todoSortByOptions } from 'src/app/proxy/dtos/todo';
import { AsyncComponent } from 'src/app/shared/classes/async-component.interface';
import { NavigatorService } from 'src/app/shared/services/navigator.service';

@Component({
  standalone: false,
  selector: 'app-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.scss'],
})
export class TodoFiltersComponent extends AsyncComponent implements OnInit {
  todoQueryParams: TodoQueryDto;
  TodoStatus = TodoStatus;
  todoStatusOptions = todoStatusOptions;
  TodoPriority = TodoPriority;
  todoPriorityOptions = todoPriorityOptions;
  TodoSortBy = TodoSortBy;
  todoSortByOptions = todoSortByOptions;
  sortDescending: boolean = false;

  constructor(
    private readonly navigatorService: NavigatorService,
    private readonly route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.navigatorService.refresh();
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.todoQueryParams = {
        priority: params['priority'] || null,
        status: params['status'] || null,
        sortBy: params['sortBy'] || null,
        sortDescending: params['sortDescending'] || null,
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

  onSortByChange(event: Event): void {
    const sortBy = TodoSortBy[(<HTMLInputElement>event.target).value];
    this.navigatorService.refresh({ sortBy });
  }

  onSortOrderChange(event: Event): void {
    const sortOrder = (<HTMLInputElement>event.target).value;
    this.sortDescending = sortOrder === 'Descending';
    this.navigatorService.refresh({ sortDescending: this.sortDescending });
  }
}
