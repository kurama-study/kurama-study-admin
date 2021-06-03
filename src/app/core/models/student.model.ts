import {CourseModel} from './course.model';

export interface StudentModel {
  _id: string;
  name: string;
  email: string;
  birthDay: Date;
  location: string;
  major: string;
  courses: {
    course: string,
    status: boolean,
    score: number
  } [];
  imgUrl: string;
  status: boolean;
  password: string;
}
