import {CourseModel} from './course.model';

export interface StudentModel {
  _id: string;
  name: string;
  email: string;
  birthDay: Date;
  location: string;
  major: string;
  courses: CourseModel [];
  imgUrl: string;
  status: boolean;
}
