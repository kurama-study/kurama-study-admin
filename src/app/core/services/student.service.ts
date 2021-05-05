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
}
