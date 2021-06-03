import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../../core/services/course.service';
import {TestLessonService} from '../../../../core/services/test-lesson.service';
import {TestLessonModel} from '../../../../core/models/test-lesson.model';
import {CommonService} from '../../../../core/services/common.service';

@Component({
  selector: 'app-list-test-lesson',
  templateUrl: './list-test-lesson.component.html',
  styleUrls: ['./list-test-lesson.component.scss']
})
export class ListTestLessonComponent implements OnInit {

  courses: string[] = []
  tests!: TestLessonModel [];

  constructor(private courseService: CourseService, private testLessonService: TestLessonService, private commonService: CommonService) { }

  ngOnInit(): void {
    // this.courseService.getListCourse().subscribe(res => {
    //   res.forEach(course => {
    //     this.courses.push(course._id);
    //   })
    //   this.testLessonService.getListTestByCourse(this.courses).subscribe(tests => {
    //     this.tests = tests;
    //   })
    // });
    this.commonService.currentUser.subscribe(res => {
      this.testLessonService.getListTestOfTeacher(res._id).subscribe(value => {
        this.tests = value;
      })
    })

  }

}
