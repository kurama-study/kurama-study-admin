import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
const routes: Routes = [
  {path: '', component: CourseListComponent}
]
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [CourseListComponent, CourseDetailComponent]
})
export class CourseTeacherModule {

}
