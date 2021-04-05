import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import { DashboardHeadComponent } from './components/dashboard-head/dashboard-head.component';
const routes: Routes = [
  {path: '', component: DashboardComponent}
];
@NgModule({
  declarations: [DashboardComponent, DashboardHeadComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class DashboardModule {}
