import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {TestLessonService} from '../../../../core/services/test-lesson.service';
import {TestLessonModel} from '../../../../core/models/test-lesson.model';
import {QuestionModel} from '../../../../core/models/question.model';

@Component({
  selector: 'app-test-lesson-detail',
  templateUrl: './test-lesson-detail.component.html',
  styleUrls: ['./test-lesson-detail.component.scss']
})
export class TestLessonDetailComponent implements OnInit {

  testId: any;
  testLesson!: TestLessonModel;
  questions!: QuestionModel[];
  loading = false;
  constructor(private route: ActivatedRoute, private testLessonService: TestLessonService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(param => {
          this.testId = param.get('id');
          this.testLessonService.getDetailTest(this.testId).subscribe((res) => {
            this.testLesson = res[0].testLesson;
            this.questions = res[1].questions;
          })
        }
      );
  }

  onDelete() {
    this.loading = true;
    this.testLessonService.deleteTestLesson(this.testId).subscribe(res => {
      this.router.navigate(['/test-lesson-management']);
    }, error => this.loading = false)
  }

  onChangeStatus() {
    this.testLessonService.changeStatusTest(this.testId).subscribe(res => {
      this.testLesson.status = !this.testLesson.status;
    })
  }

}
