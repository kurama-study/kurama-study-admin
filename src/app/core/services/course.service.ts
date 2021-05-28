import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {CourseModel} from '../models/course.model';
import * as CONST from '../constant';
import {CreateCourseRequestModel} from '../models/create-course-request.model';
import {CalendarModel} from '../models/calendar.model';
@Injectable({
  providedIn: 'root'
})
export class CourseService extends CommonService {

  getListCourse(): Observable<CourseModel[]> {
    return this.get(CONST.ApiURI.GET_LIST_COURSE);
  }

  createCourse(courseRequest: CreateCourseRequestModel): Observable<CourseModel> {
    return this.post(CONST.ApiURI.CREATE_COURSE, {course: courseRequest});
  }

  updateStatus(idCourse: string, statusCourse: boolean): Observable<CourseModel> {
    return this.post(CONST.ApiURI.UPDATE_STATUS_COURSE, {id: idCourse, status: statusCourse});
  }


  getCourseOfTeacher(uid: string): Observable<CourseModel[]> {
    return this.post(CONST.ApiURI.GET_COURSE_OF_TEACHER, {uid: uid});
  }

}
