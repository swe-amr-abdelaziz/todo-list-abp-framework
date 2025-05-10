import { mapEnumToOptions } from '@abp/ng.core';

export enum TodoPriority {
  Low = 0,
  Medium = 1,
  High = 2,
}

export const todoPriorityOptions = mapEnumToOptions(TodoPriority);
