import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {isSameDay, isSameMonth,} from 'date-fns';
import {CalendarEvent, CalendarView,} from 'angular-calendar';
import {DatePipe} from '@angular/common';
import {CommonService} from '../../../../core/services/common.service';
import {UserInfoModel} from '../../../../core/models/user-info.model';
import {Calendar} from '../../../../core/models/calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() calendarList!: Subject<Calendar[]>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;
  currentUser!: UserInfoModel;

  constructor(public datePipe: DatePipe, private commonService: CommonService) {
  }

  ngOnInit(): void {
    if (this.calendarList) {
      this.calendarList.subscribe(res => {
        res.forEach(value => {
          let date: any = this.datePipe.transform(value.date, 'hh:mm');
          const item: CalendarEvent = {
            start: new Date(value.date),
            title: value.note + ' ' + '|  time: ' + date.toString() + ' ' + ' | ' + value.hostId + ' ' + ' | ' + value.password,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          };
          this.events.push(item);
          this.dayClicked({date: new Date(), events: []});
        });
      });

    }
    this.commonService.currentUser.subscribe(res => {
      this.currentUser = res;
    });
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  eventClicked(event: any): void {
    const infoList: string[] = event.title.split('| ');
    window.open(
      `https://angular-zoom.web.app?user=${this.currentUser.email}&id=${infoList[2].trim()}&password=${infoList[3].trim()}`,
      '_blank'
    );
  }

}
