import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import { ListTestLessonComponent } from './pages/list-test-lesson/list-test-lesson.component';
import { CreateTestLessonComponent } from './pages/create-test-lesson/create-test-lesson.component';
const routes: Routes = [

]
@NgModule(
  {
    imports: [],
    exports: [],
    declarations: [ListTestLessonComponent, CreateTestLessonComponent]
  }
)
export class TestLessonManagementModule {
}
