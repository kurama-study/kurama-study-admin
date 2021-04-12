import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../../../../core/services/teacher.service';
import {TeacherModel} from '../../../../core/models/teacher.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {majorData} from '../../../../../assets/major.data';
import {pipe} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-teacher-detail-modal',
  templateUrl: './teacher-detail-modal.component.html',
  styleUrls: ['./teacher-detail-modal.component.scss']
})
export class TeacherDetailModalComponent implements OnInit {

  pipe = new DatePipe('en-US');
  idTeacher!: string;
  teacher!: TeacherModel;
  formTeacher!: FormGroup;
  listMajor: any[] = majorData;

  constructor(private teacherService: TeacherService, private fb: FormBuilder) {
    this.formTeacher = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      password: ['', Validators.min(6)],
      birthDay: ['', Validators.required],
      major: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.teacherService.getTeacherDetail(this.idTeacher).subscribe(res => {
      this.teacher = res;
      this.formTeacher.patchValue({
        name: res.name,
        email: res.email,
        location: res.location,
        password: null,
        birthDay: this.pipe.transform(new Date(res.birthDay), 'yyyy-MM-dd'),
        major: res.major
      });
    });
  }

  onUpdate(): void {}
  onDelete(): void {

  }

}
