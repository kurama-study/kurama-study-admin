import {NgModule} from '@angular/core';
import {CalendarListComponent} from './pages/calendar-list/calendar-list.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import {CalendarCommonModule, CalendarModule ,CalendarMonthModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
const routes: Routes = [
  {path: '', component: CalendarListComponent}
]
@NgModule({
  declarations: [CalendarListComponent, CalendarComponent],
  imports: [SharedModule,
    RouterModule.forChild(routes),
    CalendarMonthModule,
    CalendarCommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ]
})
export class CalendaModule {}
