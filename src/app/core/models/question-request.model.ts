import {AnswerModel} from './answer.model';

export interface QuestionRequestModel {
  question: string;
  answers: AnswerModel[];
  score: string;
}
