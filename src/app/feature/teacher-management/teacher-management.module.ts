import {NgModule} from '@angular/core';
import { ManagementComponent } from './pages/management/management.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { TeacherModalComponent } from './components/teacher-modal/teacher-modal.component';
import { TeacherDetailModalComponent } from './components/teacher-detail-modal/teacher-detail-modal.component';
const routes: Routes = [
  {path: '', component: ManagementComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [ManagementComponent, TeacherModalComponent, TeacherDetailModalComponent],
  exports: []
})
export class TeacherManagementModule {
}
