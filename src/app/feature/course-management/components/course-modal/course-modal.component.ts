import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnInit {

  courseForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      totalStudent: ['', Validators.required],
      totalLesson: ['', Validators.required],
      status: ['', Validators.required],
      teacher: ['', Validators.required],
      calender: ['', Validators.required],

    });
  }

}
