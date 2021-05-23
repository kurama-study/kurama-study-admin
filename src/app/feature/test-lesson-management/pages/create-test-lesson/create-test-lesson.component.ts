import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../../../core/services/course.service';
import {CourseModel} from '../../../../core/models/course.model';
import {TestLessonModel} from '../../../../core/models/test-lesson.model';
import {QuestionModel} from '../../../../core/models/question.model';
import {AnswerModel} from '../../../../core/models/answer.model';
import {TestLessonService} from '../../../../core/services/test-lesson.service';
import {QuestionRequestModel} from '../../../../core/models/question-request.model';
import {TestLessonRequestModel} from '../../../../core/models/test-lesson-request.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-test-lesson',
  templateUrl: './create-test-lesson.component.html',
  styleUrls: ['./create-test-lesson.component.scss']
})
export class CreateTestLessonComponent implements OnInit {

  courses!: CourseModel[];
  courseSelected!: CourseModel;
  questionText = '';
  answerA = '';
  answerB = '';
  answerC = '';
  answerD = '';
  scoreSelected = '';
  testLesson: TestLessonRequestModel = {
    questions: [],
    name: ''
  };
  answers: AnswerModel[] = [];
  loading = false;
  constructor(private courseService: CourseService,
              private testLessonService: TestLessonService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.courseService.getListCourse().subscribe(res => {
      this.courses = res;
    });
  }

  conChange(value: any) {
    this.courseSelected = value;
  }
  onAdd() {
    this.answers = [{answer :this.answerA}, {answer :this.answerB}, {answer: this.answerC}, {answer: this.answerD}]
    const questionItem: QuestionRequestModel = {
      question: this.questionText,
      answers: this.answers,
      score: this.scoreSelected,
    }
    this.testLesson.name = this.courseSelected.name;
    this.testLesson.questions.push(questionItem);
  }
  onSave() {
    this.loading = true;
    this.testLessonService.createTestLesson(this.testLesson, this.courseSelected._id).subscribe(res => {
      this.router.navigate(['/test-lesson-management'])
    }, error => this.loading = false)
  }
  onCheck(value: any) {
    this.scoreSelected = value;
  }

}
