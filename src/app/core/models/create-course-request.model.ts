
export interface CreateCourseRequestModel {
  name: string;
  studentQuantity: number;
  lessonQuantity: number;
  status: boolean;
  teacher: string;
  price: string;
  studentRegistered: number;
  learned: number;
}
