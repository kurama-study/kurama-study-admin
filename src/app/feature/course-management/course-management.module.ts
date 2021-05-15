import {NgModule} from '@angular/core';
import { ManagementComponent } from './pages/management/management.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { CourseModalComponent } from './components/course-modal/course-modal.component';
import { CalendarTeacherModalComponent } from './components/calendar-teacher-modal/calendar-teacher-modal.component';
import {CalendarModule} from 'angular-calendar';
const routes: Routes = [
  {path: '', component: ManagementComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule, CalendarModule],
  exports: [],
  declarations: [ManagementComponent, CourseModalComponent, CalendarTeacherModalComponent]
})
export class CourseManagementModule {}
