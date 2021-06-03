export interface UserInfoModel {
  _id: string;
  authorities: Array<string>;
  username: string;
  email: string;
  role: string;
  token: string;
  imgUrl: string;

}
