import { NgModule } from '@angular/core';
import { PageModule } from '@abp/ng.components/page';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TodoListComponent } from './todo/list/todo-list.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, TodoListComponent],
  imports: [SharedModule, HomeRoutingModule, PageModule, NgbTooltipModule],
})
export class HomeModule {}
