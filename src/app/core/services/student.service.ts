import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {StudentModel} from '../models/student.model';
import {CreateStudentRequestModel} from '../models/create-student-request.model';

@Injectable({providedIn: 'root'})
export class StudentService extends CommonService {
  getListStudent(): Observable<StudentModel[]> {
    return this.get(this.CONST.ApiURI.GET_LIST_STUDENT);
  }
  createStudent(studentCreate: CreateStudentRequestModel): Observable<StudentModel> {
    return this.post(this.CONST.ApiURI.CREATE_STUDENT, studentCreate);
  }
  getListStudentByCourse(students: string[]): Observable<StudentModel[]> {
    return this.post(this.CONST.ApiURI.GET_LIST_STUDENT_BY_COURSE, {students: students})
  }
  cancelCourse(course: string, student: string): Observable<any> {
    return this.post(this.CONST.ApiURI.CANCEL_COURSE, {course: course, user: student})
  }
  cancelCourseStudent(course: string, student: string): Observable<any> {
    return this.post(this.CONST.ApiURI.CANCEL_COURSE_STUDENT, {course: course, user: student});
  }
  deleteStudent(id: string): Observable<any> {
    return this.post(this.CONST.ApiURI.DELETE_STUDENT, {id: id})
  }
  updateStudent(studentReq: StudentModel): Observable<any> {
    return this.post(this.CONST.ApiURI.UPDATE_STUDENT, {userUpdate: studentReq})
  }
 }
