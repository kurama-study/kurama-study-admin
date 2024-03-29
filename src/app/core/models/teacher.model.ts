import {CourseModel} from './course.model';

export interface TeacherModel {
  _id: string;
  name: string;
  email: string;
  birthDay: Date;
  location: string;
  major: string;
  courses: CourseModel [];
  imgUrl: string;
  status: boolean;
  password: string;
}
