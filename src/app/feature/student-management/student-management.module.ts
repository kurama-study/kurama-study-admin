import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ManagementComponent } from './pages/management/management.component';
import {SharedModule} from '../../shared/shared.module';
import { StudentModalComponent } from './components/student-modal/student-modal.component';
import { ListCourseComponent } from './components/list-course/list-course.component';
const routes: Routes = [
  {path: '', component: ManagementComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [ManagementComponent, StudentModalComponent, ListCourseComponent]
})
export class StudentManagementModule {}
