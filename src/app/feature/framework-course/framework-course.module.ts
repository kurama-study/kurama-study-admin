import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ListCourseComponent } from './pages/list-course/list-course.component';
import { CourseModalComponent } from './components/course-modal/course-modal.component';
const routes: Routes = [

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [ListCourseComponent, CourseModalComponent]
})
export class FrameworkCourseModule {}
