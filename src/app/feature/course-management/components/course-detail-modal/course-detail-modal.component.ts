import { Component, OnInit } from '@angular/core';
import {TeacherModel} from '../../../../core/models/teacher.model';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {UserInfoModel} from '../../../../core/models/user-info.model';
import {CalendarModel} from '../../../../core/models/calendar.model';
import {Subject} from 'rxjs';
import {CourseService} from '../../../../core/services/course.service';
import {CommonService} from '../../../../core/services/common.service';
import {MDBModalService} from 'angular-bootstrap-md';
import {CalendarService} from '../../../../core/services/calendar.service';

@Component({
  selector: 'app-course-detail-modal',
  templateUrl: './course-detail-modal.component.html',
  styleUrls: ['./course-detail-modal.component.scss']
})
export class CourseDetailModalComponent implements OnInit {

  public saveButtonClicked: Subject<any> = new Subject<any>();
  course!: string;
  courseDetail!: any;
  teacherInfo!: TeacherModel;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  currentUser!: UserInfoModel;
  calendarList: Subject<CalendarModel[]> = new Subject<CalendarModel[]>();
  calendarCurrent!: CalendarModel[];
  calendarCourse: CalendarModel[] = [];
  error = '';
  loading = false;
  courseList!: string[];
  registered = false;
  constructor(private courseService: CourseService,
              private commonService: CommonService,
              private modalService: MDBModalService,
              private calendarService: CalendarService,
  ) {
    this.commonService.currentUser.subscribe(res => {
      this.currentUser = res;
    });
  }

  ngOnInit(): void {
    const req = {
      id: this.course
    };
    this.calendarService.getCalendarByCourse(this.course).subscribe(res => {
      this.calendarList.next(res);
      this.calendarCourse = res;
    })
    this.courseService.getCourseById(req).subscribe(res => {
      this.courseDetail = res.course;
      this.teacherInfo = res.teacher;
    });

  }



}
