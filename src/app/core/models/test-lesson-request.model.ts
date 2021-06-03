import {QuestionRequestModel} from './question-request.model';

export interface TestLessonRequestModel {
  name: string;
  questions: QuestionRequestModel[];
}
