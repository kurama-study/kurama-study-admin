import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import * as CONST from '../core/constant';
import {UserGuard} from '../shared/guards/user.guard';
import {AuthGuard} from '../shared/guards/auth.guard';
import {TeacherGuard} from '../shared/guards/teacher.guard';
import {CalendaModule} from './calendar/calendar.module';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: CONST.FontURI.AUTH},
  {path: CONST.FontURI.AUTH, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuard]},
  {
    path: CONST.FontURI.STUDENT_MANAGEMENT,
    loadChildren: () => import('./student-management/student-management.module').then(m => m.StudentManagementModule),
    canActivate: [UserGuard]
  },
  {
    path: CONST.FontURI.DASHBOARD, loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: CONST.FontURI.TEACHER_MANAGEMENT,
    loadChildren: () => import('./teacher-management/teacher-management.module').then(m => m.TeacherManagementModule),
    canActivate: [UserGuard]
  },
  {
    path: CONST.FontURI.COURSE_MANAGEMENT,
    loadChildren: () => import('./course-management/course-management.module').then(m => m.CourseManagementModule),
    canActivate: [UserGuard]
  },
  {
    path: CONST.FontURI.DOCUMENT_MANAGEMENT,
    loadChildren: () => import('./document-management/document-management.module').then(m => m.DocumentManagementModule),
    canActivate: [UserGuard]
  },
  {
    path: CONST.FontURI.TEST_LESSON_MANAGEMENT,
    loadChildren: () => import('./test-lesson-management/test-lesson-management.module').then(m => m.TestLessonManagementModule),
    canActivate: [TeacherGuard]
  },
  {
    path: CONST.FontURI.COURSE_TEACHER,
    loadChildren: () => import('./course-teacher-management/course-teacher.module').then(m => m.CourseTeacherModule),
    canActivate: [TeacherGuard]
  },
  {
    path: CONST.FontURI.CALENDAR_LIST,
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendaModule),
    canActivate: [TeacherGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeatureRouting {
}
