import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {CalendarModel} from '../models/calendar.model';
import {CourseModel} from '../models/course.model';

@Injectable({providedIn: 'root'})
export class ZoomService extends CommonService {
    createZoomMeeting(calendars: CalendarModel[], courseReq: CourseModel): Observable<any> {
      return this.post(this.CONST.ApiURI.CREATE_LIST_CALENDER, {listCalendar: calendars, course: courseReq});
    }
}
