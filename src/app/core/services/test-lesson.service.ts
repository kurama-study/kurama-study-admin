import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {TestLessonModel} from '../models/test-lesson.model';
import {TestLessonRequestModel} from '../models/test-lesson-request.model';

@Injectable({providedIn: 'root'})
export class TestLessonService extends CommonService {
  createTestLesson(testLessonRequest: TestLessonRequestModel, course: string): Observable<any> {
    return this.post(this.CONST.ApiURI.CREATE_TEST_LESSON, {course: course, testLesson: testLessonRequest});
  }
  getListTestByCourse(courseList: string[]): Observable<TestLessonModel[]> {
    return this.post(this.CONST.ApiURI.GET_LIST_TEST_LESSON, {courses: courseList});
  }
  getDetailTest(test: string): Observable<any> {
    return this.post(this.CONST.ApiURI.GET_DETAIL_TEST_LESSON, {test: test});
  }
  deleteTestLesson(test: string): Observable<any> {
    return this.post(this.CONST.ApiURI.DELETE_TEST_LESSON, {test: test});
  }


  getListTestOfTeacher(uid: string): Observable<TestLessonModel[]> {
    return this.post(this.CONST.ApiURI.GET_LIST_TEST_OF_TEACHER, {uid: uid});
  }
  changeStatusTest(test: string): Observable<any> {
    return this.post(this.CONST.ApiURI.CHANGE_STATUS_TEST, {test: test});
  }
}
