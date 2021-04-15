import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {majorData} from '../../../../../assets/major.data';
import {TeacherService} from '../../../../core/services/teacher.service';
import {CreateCourseRequestModel} from '../../../../core/models/create-course-request.model';
import {CourseService} from '../../../../core/services/course.service';
import {CalendarModel} from '../../../../core/models/calendar.model';
import {Subject} from 'rxjs';
import {MDBModalService} from 'angular-bootstrap-md';
import {CalendarService} from '../../../../core/services/calendar.service';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnInit {
  courseForm!: FormGroup;
  listMajor: any[] = majorData;
  majorDefault = 'SOFTWARE_ENGINEER';
  listTeacher: any[] = [];
  teacherSelected!: string;
  dateCourse!: Date;
  noteCourse!: string;
  loading = false;
  calendarList: CalendarModel[] = [];
  public saveButtonClicked: Subject<any> = new Subject<any>();
  headElements = ['#', 'Date', 'Note'];
  messError = '';
  calendarListOfTeacher: CalendarModel[] = [];
  createSubject = new Subject<CalendarModel[]>();
  constructor(private fb: FormBuilder,
              private teacherService: TeacherService,
              private courseService: CourseService,
              private modalService: MDBModalService,
              private calendarService: CalendarService) {
  }

  get f(): any {
    return this.courseForm.controls;
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      studentQuantity: ['', [Validators.required, Validators.min(1)]],
      lessonQuantity: ['', [Validators.required, Validators.min(1)]],
      status: [true, Validators.required],
    });
    this.teacherService.getTeacherByMajor(this.majorDefault).subscribe((res) => {
      res.forEach((teacher) => {
        this.listTeacher = [...this.listTeacher, {
          name: teacher.name,
          _id: teacher._id,
          imgUrl: teacher.imgUrl
        }];
      });
    });
  }

  onAddCalender(): void {
    if (this.dateCourse && this.noteCourse && this.teacherSelected) {
      const calender: CalendarModel = {
        date: this.dateCourse,
        note: this.noteCourse,
        teacher: this.teacherSelected
      };
      const dateNow = new Date();
      if (new Date(this.dateCourse).getTime() - dateNow.getTime() > 0) {

        this.validateCalendar(calender);

      } else {
        this.messError = 'Can not add calendar';
      }
    }
    if (!this.teacherSelected) {
      this.messError = 'Need select teacher!';
    }
    if (this.teacherSelected) {
      if (!this.dateCourse || !this.noteCourse) {
        this.messError = 'Need to enter information (day, time, note)';
      }
    }

  }

  validateCalendar(calender: CalendarModel): void {
    if (this.calendarList.length > 0) {
      const dateLate = this.calendarList[this.calendarList.length - 1].date;
      if (new Date(this.dateCourse).getTime() - new Date(dateLate).getTime() >= 2700000) {
        this.calendarList.push(calender);
        this.messError = '';
      } else {
        this.messError = 'Can not add calendar';
      }
    } else {
      this.calendarList.push(calender);
      this.messError = '';
    }
  }

  onRemoveCalender(index: number): void {
    this.calendarList.splice(index, 1);
  }

  getTeacherByMajor(value: any): void {
    this.teacherService.getTeacherByMajor(value.code).subscribe(res => {
      this.listTeacher = [];
      this.teacherSelected = '';
      res.forEach((teacher) => {
        this.listTeacher = [...this.listTeacher, {
          name: teacher.name,
          _id: teacher._id,
          imgUrl: teacher.imgUrl
        }];
      });
    });
  }

  onSelectTeacher(value: any): void {
    this.messError = '';
    this.calendarService.getListCalendarOfTeacher(this.teacherSelected).subscribe(res => {
      this.createSubject.next(res);
      this.calendarListOfTeacher = res;
    });
  }

  onCreateCourse(): void {
    this.loading = true;
    const createCourseRequest: CreateCourseRequestModel = {
      name: this.f.name.value,
      status: this.f.status.value,
      teacher: this.teacherSelected,
      lessonQuantity: this.f.studentQuantity.value,
      studentQuantity: this.f.lessonQuantity.value
    };
    this.courseService.createCourse(createCourseRequest, this.calendarList).subscribe(res => {
      this.saveButtonClicked.next(res);
      this.modalService.hide(1);
      this.loading = false;
    }, error => this.loading = false);
  }
}
