import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {majorData} from '../../../../../assets/major.data';
import {TeacherService} from '../../../../core/services/teacher.service';
import {CreateTeacherRequest} from '../../../../core/models/create-teacher-request';
import {Subject} from 'rxjs';
import {MDBModalService} from 'angular-bootstrap-md';
import {UserInfoModel} from '../../../../core/models/user-info.model';
import {CommonService} from '../../../../core/services/common.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-teacher-modal',
  templateUrl: './teacher-modal.component.html',
  styleUrls: ['./teacher-modal.component.scss']
})
export class TeacherModalComponent implements OnInit {

  teacherForm!: FormGroup;
  listMajor: any[] = majorData;
  majorDefault = 'SOFTWARE_ENGINEER';
  loading = false;
  mess!: string | null;
  currentUser!: UserInfoModel;
  imgUrl!: string | ArrayBuffer | null;
  localImgUrl!: string | ArrayBuffer | null;


  fileToUpload!: File | null;


  public saveButtonClicked: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder,
              private teacherService: TeacherService,
              private modalService: MDBModalService,
              private commonService: CommonService,
              private storage: AngularFireStorage) {
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      password: ['', Validators.required],
      birthDay: ['', Validators.required],
    });
    this.commonService.currentUser.subscribe(res => this.currentUser = res);
  }

  get f(): any {
    return this.teacherForm.controls;
  }

  ngOnInit(): void {
  }

  conCreate(): void {
    this.mess = null;
    const teacherRequest: CreateTeacherRequest = {
      name: this.f.name.value,
      birthDay: this.f.birthDay.value,
      location: this.f.location.value,
      password: this.f.password.value,
      email: this.f.email.value,
      major: this.majorDefault,
      imgUrl: this.imgUrl
    };
    this.teacherService.createTeacher(teacherRequest).subscribe(res => {
      this.saveButtonClicked.next(res);
      this.modalService.hide(1);
      this.loading = false;
    }, error => {
      this.mess = error.error.message;
      this.loading = false;
    });
  }
  onSelectFile(value: any): void {
    const files = value.files;
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = files.item(0);
    if (this.fileToUpload) {
      const mimeType = this.fileToUpload.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = (event) => {
        this.localImgUrl = reader.result;
        this.imgUrl = reader.result;
      };
    }
  }
  onSaveFile(): void {
    this.loading = true;
    if (this.fileToUpload) {
      let strs: string[] = this.fileToUpload.name.split('.');
      const imgType = strs[strs.length - 1];
      strs = strs.slice(0, -1);
      const filePath = `avatar/${strs.join('.').replace(' ', '_')}_${new Date().getTime()}.${imgType}`;
      const fileRef = this.storage.ref(filePath);

      this.storage.upload(filePath, this.fileToUpload).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url: string | ArrayBuffer | null) => {
            this.imgUrl = url;
            this.conCreate();
          });
        })
      ).subscribe();
    }
  }
}
