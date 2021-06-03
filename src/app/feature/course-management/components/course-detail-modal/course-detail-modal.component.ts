import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TeacherModel} from '../../../../core/models/teacher.model';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {UserInfoModel} from '../../../../core/models/user-info.model';
import {CalendarModel} from '../../../../core/models/calendar.model';
import {Subject} from 'rxjs';
import {CourseService} from '../../../../core/services/course.service';
import {CommonService} from '../../../../core/services/common.service';
import {MDBModalService, MdbTableDirective} from 'angular-bootstrap-md';
import {CalendarService} from '../../../../core/services/calendar.service';
import {StudentService} from '../../../../core/services/student.service';
import {CourseModel} from '../../../../core/models/course.model';
import {StudentModel} from '../../../../core/models/student.model';

@Component({
  selector: 'app-course-detail-modal',
  templateUrl: './course-detail-modal.component.html',
  styleUrls: ['./course-detail-modal.component.scss']
})
export class CourseDetailModalComponent implements OnInit {

  public saveButtonClicked: Subject<any> = new Subject<any>();
  course!: string;
  courseDetail!: CourseModel;
  teacherInfo!: TeacherModel;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  currentUser!: UserInfoModel;
  calendarList: Subject<CalendarModel[]> = new Subject<CalendarModel[]>();
  calendarCurrent!: CalendarModel[];
  error = '';
  loading = false;
  courseList!: string[];
  registered = false;
  loadingDelete = false;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable!: MdbTableDirective;

  headElements = ['#', 'image', 'name',  'email', 'command'];
  elements: StudentModel[] = [];

  maxVisibleItems = 8;
  constructor(private courseService: CourseService,
              private commonService: CommonService,
              private modalService: MDBModalService,
              private calendarService: CalendarService,
              private studentService: StudentService
  ) {
    this.commonService.currentUser.subscribe(res => {
      this.currentUser = res;
    });
  }

  ngOnInit(): void {
    const req = {
      id: this.course
    };
    this.courseService.getCourseById(req).subscribe(res => {
      this.courseDetail = res.course;
      this.teacherInfo = res.teacher;
      this.studentService.getListStudentByCourse(this.courseDetail.students).subscribe(res => {
        this.elements = res;
      });
    });

  }
  onCancel(user: string) {
    this.studentService.cancelCourse(this.courseDetail._id, user).subscribe(res => {
    });
    this.studentService.cancelCourseStudent(this.courseDetail._id, user).subscribe(value => {
      this.modalService.hide(1);
      this.saveButtonClicked.next(value);
    })
  }
  onDelete() {
    this.loadingDelete = true;
    this.courseService.deleteCourse(this.courseDetail._id).subscribe(res => {
      this.loadingDelete = false;
      this.modalService.hide(1);
      this.saveButtonClicked.next(res);
    })
  }



}
