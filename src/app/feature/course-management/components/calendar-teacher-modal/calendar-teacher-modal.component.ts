import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {CalendarModel} from '../../../../core/models/calendar.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-calendar-teacher-modal',
  templateUrl: './calendar-teacher-modal.component.html',
  styleUrls: ['./calendar-teacher-modal.component.scss']
})
export class CalendarTeacherModalComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  @Input() listCalendar!: Subject<CalendarModel[]>;
  events: CalendarEvent[] = [];
  calendarList!: CalendarModel[];

  constructor() {
  }

  ngOnInit(): void {
    this.listCalendar.subscribe(res => {
      this.events = [];
      this.calendarList = res;
      this.calendarList.forEach(value => {
        const event = {
          start: new Date(value.date),
          title: value.note,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        };
        this.events.push(event);
      });
    });
  }

}
