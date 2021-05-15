import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {CalendarModel} from '../models/calendar.model';

@Injectable({providedIn: 'root'})
export class CalendarService extends CommonService {
  getListCalendarOfTeacher(idTeacher: string): Observable<CalendarModel[]> {
    return this.get(this.CONST.ApiURI.GET_LIST_CALENDAR_OF_TEACHER + `?teacher=${idTeacher}`);
  }
}
