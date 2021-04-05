import {Component} from '@angular/core';
import {CommonService} from './core/services/common.service';
import {UserInfoModel} from './core/models/user-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser!: UserInfoModel;

  constructor(private commonService: CommonService) {
    this.commonService.currentUser.subscribe(res => {
      this.currentUser = res;
    });
  }

}
