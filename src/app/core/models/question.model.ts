import {AnswerModel} from './answer.model';

export interface QuestionModel {
  _id: string;
  question: string;
  answers: AnswerModel[];
  score: string;
}
