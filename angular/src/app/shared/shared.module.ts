import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { NavigatorService } from './services/navigator.service';

@NgModule({
  declarations: [WrapperComponent],
  imports: [CoreModule, ThemeSharedModule, NgbDropdownModule, NgxValidateCoreModule],
  exports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    WrapperComponent,
  ],
  providers: [NavigatorService],
})
export class SharedModule {}
