import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../../../../core/services/course.service';
import {TestLessonService} from '../../../../core/services/test-lesson.service';
import {CommonService} from '../../../../core/services/common.service';
import {CourseModel} from '../../../../core/models/course.model';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {


  documentList = []
  courses!: CourseModel[];
  constructor(private courseService: CourseService, private testLessonService: TestLessonService, private commonService: CommonService) {

  }

  ngOnInit(): void {
    this.commonService.currentUser.subscribe(res => {
      this.courseService.getCourseOfTeacher(res._id).subscribe(value => {
        this.courses = value;
      })
    })
  }

  onCreate(): void {

  }


}
