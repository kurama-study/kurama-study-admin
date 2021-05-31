import {TeacherModel} from './teacher.model';
import {CalendarModel} from './calendar.model';

export interface CourseModel {
  code: string;
  _id: string;
  name: string;
  studentQuantity: number;
  lessonQuantity: number;
  calendars: CalendarModel[];
  status: boolean;
  teacher: TeacherModel;
  studentRegistered: number;
  learned: number;

}
