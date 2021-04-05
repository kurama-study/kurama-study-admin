import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserInfoModel} from '../../core/models/user-info.model';
import {CommonService} from '../../core/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  currentUser!: UserInfoModel;

  constructor(private commonService: CommonService) {
    this.commonService.currentUser.subscribe(res => this.currentUser = res);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !!this.currentUser;
  }

}
