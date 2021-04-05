import {NgModule} from '@angular/core';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RouterModule, Routes} from '@angular/router';
import * as CONST from '../../core/constant';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: CONST.FontURI.LOGIN},
  {path: CONST.FontURI.LOGIN, component: LoginPageComponent}
];

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [RouterModule.forChild(routes), SharedModule, ]
})
export class AuthModule {
}
