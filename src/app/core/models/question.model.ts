import {AnswerModel} from './answer.model';

export interface QuestionModel {
  question: string;
  answers: AnswerModel[];
  score: string;
}
