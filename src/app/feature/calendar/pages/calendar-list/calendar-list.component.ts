import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../../core/services/common.service';
import {UserInfoModel} from '../../../../core/models/user-info.model';
import {Calendar} from '../../../../core/models/calendar';
import {Subject} from 'rxjs';
import {CalendarService} from '../../../../core/services/calendar.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {

  calendarList: Subject<Calendar[]> = new Subject<Calendar[]>();
  currentUser!: UserInfoModel;

  constructor(private commonService: CommonService, private calendarService: CalendarService) {
  }

  ngOnInit(): void {
    this.commonService.currentUser.subscribe(res => {
      this.currentUser = res;
      this.calendarService.getListCalendar(this.currentUser._id).subscribe(value => {
        this.calendarList.next(value);
      })
    });
  }

}
