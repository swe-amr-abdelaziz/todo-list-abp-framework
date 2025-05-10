import { NgModule } from '@angular/core';
import { PageModule } from '@abp/ng.components/page';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TodoListComponent } from './todo/list/todo-list.component';
import {
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TodoFormComponent } from './todo/form/todo-form.component';
import { TodoFormService } from './todo/form/todo-form.service';
import { FormsModule } from '@angular/forms';
import { TodoFiltersComponent } from './todo/filters/todo-filters.component';

@NgModule({
  declarations: [HomeComponent, TodoListComponent, TodoFormComponent, TodoFiltersComponent],
  imports: [
    FormsModule,
    HomeRoutingModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbTooltipModule,
    PageModule,
    SharedModule,
  ],
  providers: [TodoFormService],
})
export class HomeModule {}
