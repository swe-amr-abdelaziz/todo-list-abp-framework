import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoDto } from '../../../proxy/dtos/todo';
import {
  TodoPriority,
  todoPriorityOptions,
  TodoService,
  TodoStatus,
  todoStatusOptions,
} from '../../../proxy';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { TodoFormService } from './todo-form.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDateStruct,
  NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { TodoFormOutput } from 'src/app/shared/interfaces';
import { AsyncComponent } from 'src/app/shared/classes/async-component.interface';
import { takeUntil } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class TodoFormComponent extends AsyncComponent implements OnInit {
  @Input() todoId?: string = null;
  @Output() todoSubmitted = new EventEmitter<TodoFormOutput>();

  form: FormGroup;
  isFormOpen: boolean = false;
  formTitle: string;
  todo: TodoDto;

  TodoStatus = TodoStatus;
  todoStatusOptions = todoStatusOptions;
  TodoPriority = TodoPriority;
  todoPriorityOptions = todoPriorityOptions;

  dueDate: Date;
  dueTime: NgbTimeStruct;
  minDueDate: NgbDateStruct;

  constructor(
    private formBuilder: FormBuilder,
    private readonly confirmation: ConfirmationService,
    private readonly toast: ToasterService,
    private readonly todoFormService: TodoFormService,
    private readonly todoService: TodoService,
  ) {
    super();
  }

  ngOnInit() {
    this.todoFormService.todoId$.subscribe(todoId => {
      this.todoId = todoId;
      if (this.isEdit) {
        this.todoFormService.isLoading = true;
        this.formTitle = 'Edit Todo';
        this.todoService
          .get(todoId)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: todo => {
              this.todo = todo;
              this.formalizeDueDate(this.todo.dueDate);
              this.calculateMinDueDate();
              this.buildForm();
              this.isFormOpen = true;
              this.todoFormService.isLoading = false;
            },
            error: () => {
              this.toast.error('Error occurred while loading todo');
              this.todoFormService.isLoading = false;
            },
          });
      } else {
        this.formTitle = 'Add New Todo';
        this.todo = {
          title: '',
          description: '',
          status: TodoStatus.Pending,
          priority: TodoPriority.Low,
        };
        this.calculateMinDueDate();
        this.buildForm();
        this.isFormOpen = true;
      }
    });
  }

  private get isEdit(): boolean {
    return this.todoId !== null;
  }

  private formalizeDueDate(dueDate?: string): void {
    if (dueDate) {
      this.dueDate = new Date(dueDate);
      this.dueTime = {
        hour: this.dueDate.getHours(),
        minute: this.dueDate.getMinutes(),
        second: this.dueDate.getSeconds(),
      };
    }
  }

  private calculateMinDueDate(): void {
    const date = new Date();
    this.minDueDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      title: [this.todo.title, [Validators.required, Validators.maxLength(100)]],
      description: [this.todo.description, [Validators.maxLength(500)]],
      status: [
        this.todo.status,
        [Validators.min(TodoStatus.Pending), Validators.max(TodoStatus.Completed)],
      ],
      priority: [
        this.todo.priority,
        [Validators.min(TodoPriority.Low), Validators.max(TodoPriority.High)],
      ],
      dueDate: [this.dueDate],
      dueTime: [this.dueTime],
    });
  }

  submit(): void {
    this.markFormGroupAsTouched(this.form);
    if (new Date(this.todo.dueDate) < new Date()) {
      this.toast.error('Due date cannot be in the past');
      return;
    }
    if (this.form.invalid) {
      return;
    }
    this.confirmation
      .info('Are you sure you want to submit data?', 'Submit Data')
      .subscribe(result => {
        if (result === Confirmation.Status.confirm) {
          this.todoFormService.isLoading = true;
          if (this.isEdit) {
            this.todoService
              .update(this.todo.id, this.todo)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: updatedTodo => {
                  this.toast.success('Todo has been updated successfully');
                  this.todoFormService.isLoading = false;
                  this.todoSubmitted.emit({ isEdit: this.isEdit, todo: updatedTodo });
                  this.isFormOpen = false;
                },
                error: () => {
                  this.toast.error('Error occurred while updating todo');
                  this.isFormOpen = false;
                },
              });
          } else {
            this.todoService
              .create(this.todo)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: createdTodo => {
                  this.toast.success('Todo has been created successfully');
                  this.todoFormService.isLoading = false;
                  this.todoSubmitted.emit({ isEdit: this.isEdit, todo: createdTodo });
                  this.isFormOpen = false;
                },
                error: () => {
                  this.toast.error('Error occurred while creating todo');
                  this.isFormOpen = false;
                },
              });
          }
        }
      });
  }

  private markFormGroupAsTouched(form: FormGroup): void {
    this.normalizeFormGroup();
    Object.values(form.controls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity();

      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      }
    });
  }

  private normalizeFormGroup(): void {
    this.form.get('title')?.setValue(this.form.get('title').value?.trim());
    this.form.get('description')?.setValue(this.form.get('description').value?.trim());

    const { title, description, status, priority, dueDate, dueTime } = this.form.value;

    this.todo.title = title;
    this.todo.description = description;
    this.todo.status = status;
    this.todo.priority = priority;
    this.todo.dueDate = this.constructDueDate(dueDate, dueTime);
  }

  private constructDueDate(dueDate?: Date, dueTime?: NgbTimeStruct): string | undefined {
    if (dueDate) {
      if (dueTime) {
        return new Date(
          dueDate.getFullYear(),
          dueDate.getMonth(),
          dueDate.getDate(),
          dueTime.hour,
          dueTime.minute,
        ).toISOString();
      }
      return dueDate.toISOString();
    }
    return undefined;
  }
}
