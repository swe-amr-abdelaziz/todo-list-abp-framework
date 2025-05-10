import type { TodoDto } from './dtos/todo/models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiName = 'Default';
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, TodoDto[]>({
      method: 'GET',
      url: '/api/app/todo',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
