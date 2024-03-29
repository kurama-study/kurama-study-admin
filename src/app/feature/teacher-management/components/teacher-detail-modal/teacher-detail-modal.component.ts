import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../../../core/services/teacher.service';
import {TeacherModel} from '../../../../core/models/teacher.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {majorData} from '../../../../../assets/major.data';
import {DatePipe} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {Subject} from 'rxjs';
import {MDBModalService} from 'angular-bootstrap-md';

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
  major= ''
  loadingDelete = false;
  loadingUpdate = false;
  messError = '';
  public saveButtonClicked: Subject<any> = new Subject<any>();

  constructor(private teacherService: TeacherService,
              private fb: FormBuilder,
              private storage: AngularFireStorage,
              private modalService: MDBModalService) {
    this.formTeacher = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      password: ['', Validators.min(6)],
      birthDay: ['', Validators.required],
      major: ['', Validators.required]
    });
  }
  get f() {return  this.formTeacher.controls}
  ngOnInit(): void {
    this.teacherService.getTeacherDetail(this.idTeacher).subscribe(res => {
      this.teacher = res;
      this.formTeacher.patchValue({
        name: res.name,
        email: res.email,
        location: res.location,
        password: '111111',
        birthDay: this.pipe.transform(new Date(res.birthDay), 'yyyy-MM-dd'),
        major: res.major
      });
    });
  }

  onUpdate(): void {
    this.teacher.name = this.f.name.value;
    this.teacher.email = this.f.email.value;
    this.teacher.birthDay = this.f.birthDay.value;
    this.teacher.location = this.f.location.value;
    this.teacher.major = this.f.major.value;
    this.teacher.password = this.f.password.value;
    this.loadingUpdate = true;
    this.teacherService.updateTeacher(this.teacher).subscribe(res => {
      this.loadingUpdate = false;
      this.saveButtonClicked.next('');
      this.modalService.hide(1);
    })
  }

  onDelete(): void {
    this.messError = '';
    this.loadingDelete = true;
    this.teacherService.deleteTeacher(this.teacher._id).subscribe(res => {
      this.storage.storage.refFromURL(this.teacher.imgUrl).delete().then(r => {
        this.loadingDelete = false;
        this.saveButtonClicked.next('');
        this.modalService.hide(1);
      });

    }, error => {
      this.loadingDelete = false;
      this.messError = error.error.message;
    });
  }

}
