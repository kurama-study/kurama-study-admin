import {NgModule} from '@angular/core';
import { ManagementComponent } from './pages/management/management.component';
import {RouterModule, Routes} from '@angular/router';
const routes: Routes = [
  {path: '', component: ManagementComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [ManagementComponent]
})
export class CourseManagementModule {}
