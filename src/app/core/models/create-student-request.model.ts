export interface CreateStudentRequestModel {
  email: string;
  name: string;
  password: string;
  birthDay: Date;
  location: string;
  major: string;
  imgUrl: string | ArrayBuffer | null;
}
