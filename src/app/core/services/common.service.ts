import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as CONST from '../constant';
import {UserInfoModel} from '../models/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public CONST = CONST;
  currentUser!: Observable<UserInfoModel>;
  currentUserSubject!: BehaviorSubject<any>;
  private readonly backendUrl = environment.backend_url;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserInfoModel>(JSON.parse(this.getLocalStorage(CONST.LocalStorage.USER_INFO)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  protected get(api: string): Observable<any> {
    return this.httpClient.get<any>(this.backendUrl + api);
  }

  protected post(api: string, requestBody: any): Observable<any> {
    return this.httpClient.post<any>(this.backendUrl + api, requestBody);
  }

  public setLocalStorage(key: string, data: any): void {
    if (key === CONST.LocalStorage.USER_INFO) {
      this.currentUserSubject.next(data);
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getLocalStorage(key: string): any {
    return localStorage.getItem(key);
  }

  public removeLocalStorage(key: string): void {
    if (key === CONST.LocalStorage.USER_INFO) {
      this.currentUserSubject.next(null);
    }
    localStorage.removeItem(key);
  }

}
