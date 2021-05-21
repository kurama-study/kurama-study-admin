import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ListTestLessonComponent } from './pages/list-test-lesson/list-test-lesson.component';
import { CreateTestLessonComponent } from './pages/create-test-lesson/create-test-lesson.component';
import {SharedModule} from '../../shared/shared.module';
const routes: Routes = [
  {path: '', component: ListTestLessonComponent},
  {path: 'create', component: CreateTestLessonComponent}
];
@NgModule(
  {
    imports: [RouterModule.forChild(routes), SharedModule],
    exports: [],
    declarations: [ListTestLessonComponent, CreateTestLessonComponent]
  }
)
export class TestLessonManagementModule {
}
