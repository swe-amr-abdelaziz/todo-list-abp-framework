import { mapEnumToOptions } from '@abp/ng.core';

export enum TodoSortBy {
  Title = 0,
  Description = 1,
  Status = 2,
  Priority = 3,
  DueDate = 4,
}

export const todoSortByOptions = mapEnumToOptions(TodoSortBy);
