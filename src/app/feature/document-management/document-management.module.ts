import {NgModule} from '@angular/core';
import { ManagementComponent } from './pages/management/management.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
const routes: Routes = [
  {path: '', component: ManagementComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule],
  exports: [],
  declarations: [ManagementComponent]
})
export class DocumentManagementModule {
}
