import {Component, OnInit} from '@angular/core';
import * as CONST from '../../../core/constant';
import {CommonService} from '../../../core/services/common.service';
import {UserInfoModel} from '../../../core/models/user-info.model';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  routing = CONST.FontURI;
  currentUser!: UserInfoModel;
  loading = false;
  isAdmin = false;
  isTeacher = false;
  constructor(private commonService: CommonService, private authService: AuthService, private router: Router) {
    this.commonService.currentUser.subscribe(res => {
      this.currentUser = res;
      if (this.currentUser.role === 'ADMIN') {
        this.isAdmin = true;
      }
      if (this.currentUser.role === 'USER_TEACHER') {
        this.isTeacher = true;
      }
    });
  }

  ngOnInit(): void {
  }
  onLogout(): void {
    this.loading = true;
      this.commonService.removeLocalStorage(CONST.LocalStorage.USER_INFO);
      this.router.navigate([CONST.FontURI.AUTH, CONST.FontURI.LOGIN]);
  }


}
