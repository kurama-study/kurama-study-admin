import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRequestModel} from '../../../../core/models/login-request.model';
import {AuthService} from '../../../../core/services/auth.service';
import * as CONST from '../../../../core/constant';
import {CommonService} from '../../../../core/services/common.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  error = false;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private commonService: CommonService) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f(): any {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.loading = true;
    const loginRequest: LoginRequestModel = {
      email: this.f.email.value,
      password: this.f.password.value
    };
    this.authService.login(loginRequest).subscribe(res => {
      if (res.user.role === 'ADMIN') {
        res.user.token = res.token;
        this.commonService.setLocalStorage(CONST.LocalStorage.USER_INFO, res.user);
        this.router.navigate([CONST.FontURI.DASHBOARD]);
      } else {
        this.error = true;
        this.loading = false;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      this.error = true;
    });
  }

}
