import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../../core/services/course.service';
import {TestLessonService} from '../../../../core/services/test-lesson.service';
import {TestLessonModel} from '../../../../core/models/test-lesson.model';

@Component({
  selector: 'app-list-test-lesson',
  templateUrl: './list-test-lesson.component.html',
  styleUrls: ['./list-test-lesson.component.scss']
})
export class ListTestLessonComponent implements OnInit {

  courses: string[] = []
  tests!: TestLessonModel [];
  constructor(private courseService: CourseService, private testLessonService: TestLessonService) { }

  ngOnInit(): void {
    this.courseService.getListCourse().subscribe(res => {
      res.forEach(course => {
        this.courses.push(course._id);
      })
      this.testLessonService.getListTestByCourse(this.courses).subscribe(tests => {
        this.tests = tests;
      })
    });
  }

}
