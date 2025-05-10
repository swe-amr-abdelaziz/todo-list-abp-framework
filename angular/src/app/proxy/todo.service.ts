import type { CreateTodoDto, TodoDto, TodoQueryDto, UpdateTodoDto } from './dtos/todo/models';
import type { TodoStatus } from './todo-status.enum';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiName = 'Default';
  

  create = (todoDto: CreateTodoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TodoDto>({
      method: 'POST',
      url: '/api/app/todo',
      body: todoDto,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/todo/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TodoDto>({
      method: 'GET',
      url: `/api/app/todo/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (todoQueryDto: TodoQueryDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TodoDto[]>({
      method: 'GET',
      url: '/api/app/todo',
      params: { status: todoQueryDto.status, priority: todoQueryDto.priority },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, todoDto: UpdateTodoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TodoDto>({
      method: 'PUT',
      url: `/api/app/todo/${id}`,
      body: todoDto,
    },
    { apiName: this.apiName,...config });
  

  updateStatus = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TodoStatus>({
      method: 'PUT',
      url: `/api/app/todo/${id}/status`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
