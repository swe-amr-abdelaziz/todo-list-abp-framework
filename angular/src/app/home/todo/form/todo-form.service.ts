import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AsyncComponent } from 'src/app/shared/classes/async-component.interface';

@Injectable({ providedIn: 'root' })
export class TodoFormService extends AsyncComponent {
  private todoId = new Subject<string | null>();
  todoId$ = this.todoId.asObservable();

  open(todoId: string | null = null) {
    this.todoId.next(todoId);
  }

  close() {
    this.todoId.next(null);
  }
}
