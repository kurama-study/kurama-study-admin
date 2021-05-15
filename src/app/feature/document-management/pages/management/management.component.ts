import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {


  topic = '';
  agenda = '';
  date = '';
  start = 0;
  duration = 0;
  api = 'https://api.zoom.us/v2/users/OPbNpbfAR9ysZttKzOtJdQ/meetings';
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {

  }

  onCreate(): void {
    this.http.post('http://localhost:3002/kurama/zoom/test', {}).subscribe(res => {
      console.log(res);
    });
    // const reqBody = {
    //   topic: this.topic,
    //   start_time: this.date,
    //   duration: this.duration,
    //   agenda: this.agenda
    // };
    // this.http.post(this.api, reqBody, ).subscribe(res => {
    //   console.log(res);
    // });
  }


}
