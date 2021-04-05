import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ManagementComponent } from './pages/management/management.component';
const routes: Routes = [
  {path: '', component: ManagementComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [ManagementComponent]
})
export class StudentManagementModule {}
