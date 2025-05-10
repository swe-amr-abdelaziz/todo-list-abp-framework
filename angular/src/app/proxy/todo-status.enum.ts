import { mapEnumToOptions } from '@abp/ng.core';

export enum TodoStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
}

export const todoStatusOptions = mapEnumToOptions(TodoStatus);
