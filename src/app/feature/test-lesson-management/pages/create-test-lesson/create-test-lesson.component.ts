import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../../../core/services/course.service';
import {CourseModel} from '../../../../core/models/course.model';
import {TestLessonModel} from '../../../../core/models/test-lesson.model';
import {QuestionModel} from '../../../../core/models/question.model';
import {AnswerModel} from '../../../../core/models/answer.model';

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
  testLesson: TestLessonModel = {
    questions: [],
  };

  constructor(private courseService: CourseService) {
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
    const answers: AnswerModel[] = [{answer :this.answerA}, {answer :this.answerB}, {answer: this.answerC}, {answer: this.answerD}]
    const questionItem: QuestionModel = {
      question: this.questionText,
      answers: answers,
      score: ''
    }
    console.log(questionItem)
    this.testLesson.questions.push(questionItem);
  }

}
