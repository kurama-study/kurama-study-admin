import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {CourseModel} from '../models/course.model';
import * as CONST from '../constant';
@Injectable({
  providedIn: 'root'
})
export class CourseService extends CommonService {
  getListCourse(): Observable<CourseModel[]> {
    return this.get(CONST.ApiURI.GET_LIST_COURSE);
  }
}
