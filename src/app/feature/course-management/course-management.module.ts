import {NgModule} from '@angular/core';
import { ManagementComponent } from './pages/management/management.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { CourseModalComponent } from './components/course-modal/course-modal.component';
const routes: Routes = [
  {path: '', component: ManagementComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [],
  declarations: [ManagementComponent, CourseModalComponent]
})
export class CourseManagementModule {}
