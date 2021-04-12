import {TeacherModel} from './teacher.model';

export interface CourseModel {
  _id: string;
  name: string;
  total_student: number;
  total_lesson: number;
  calendars: [{time: string, date: Date}];
  status: boolean;
  auth: string;
  teacher: TeacherModel;
}
