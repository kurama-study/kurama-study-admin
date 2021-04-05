import {UserInfoModel} from './user-info.model';

export interface LoginInfoModel {
  user: UserInfoModel;
  token: string;
}
