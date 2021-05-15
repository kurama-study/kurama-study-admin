import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {UserInfoModel} from './models/user-info.model';
import {CommonService} from './services/common.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  userInfo!: UserInfoModel;

  constructor(private commonService: CommonService) {
    this.commonService.currentUser.subscribe(res => this.userInfo = res);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.userInfo && this.userInfo.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userInfo.token}`
        }
      });
    }
    return next.handle(request);
  }
}
