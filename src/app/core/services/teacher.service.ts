import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {TeacherModel} from '../models/teacher.model';
import {CreateTeacherRequestModel} from '../models/create-teacher-request.model';

@Injectable({providedIn: 'root'})
export class TeacherService extends CommonService{
  getListTeacher(): Observable<TeacherModel[]> {
    return  this.get(this.CONST.ApiURI.GET_LIST_TEACHER);
  }
  createTeacher(createRequest: CreateTeacherRequestModel): Observable<any> {
    return this.post(this.CONST.ApiURI.CREATE_TEACHER, createRequest);
  }
  getTeacherDetail(id: string): Observable<TeacherModel> {
    return this.get(this.CONST.ApiURI.GET_DETAIL_TEACHER + `?id=${id}`);
  }
  deleteTeacher(teacherTd: string): Observable<any> {
    return this.post(this.CONST.ApiURI.DELETE_TEACHER, {id: teacherTd});
  }
  getTeacherByMajor(majorTeacher: string, roleTeacher: string): Observable<TeacherModel[]> {
    return this.get(this.CONST.ApiURI.GET_TEACHER_BY_MAJOR + `?major=${majorTeacher}&&role=${roleTeacher}`);
  }
}
