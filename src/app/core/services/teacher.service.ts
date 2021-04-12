import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {TeacherModel} from '../models/teacher.model';
import {CreateTeacherRequest} from '../models/create-teacher-request';

@Injectable({providedIn: 'root'})
export class TeacherService extends CommonService{
  getListTeacher(): Observable<TeacherModel[]> {
    return  this.get(this.CONST.ApiURI.GET_LIST_TEACHER);
  }
  createTeacher(createRequest: CreateTeacherRequest): Observable<any> {
    return this.post(this.CONST.ApiURI.CREATE_TEACHER, createRequest);
  }
  getTeacherDetail(id: string): Observable<TeacherModel> {
    return this.get(this.CONST.ApiURI.GET_DETAIL_TEACHER + `?id=${id}`);
  }
}
