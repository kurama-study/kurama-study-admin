import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {majorData} from '../../../../../assets/major.data';
import {UserInfoModel} from '../../../../core/models/user-info.model';
import {Subject} from 'rxjs';
import {TeacherService} from '../../../../core/services/teacher.service';
import {MDBModalService} from 'angular-bootstrap-md';
import {CommonService} from '../../../../core/services/common.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {CreateTeacherRequestModel} from '../../../../core/models/create-teacher-request.model';
import {finalize} from 'rxjs/operators';
import {StudentService} from '../../../../core/services/student.service';
import {StudentModel} from '../../../../core/models/student.model';
import {DatePipe} from '@angular/common';
import {CourseService} from '../../../../core/services/course.service';
import {CourseModel} from '../../../../core/models/course.model';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.scss']
})
export class StudentModalComponent implements OnInit {

  studentForm!: FormGroup;
  listMajor: any[] = majorData;
  majorDefault = 'SOFTWARE_ENGINEER';
  loading = false;
  mess!: string | null;
  currentUser!: UserInfoModel;
  imgUrl!: string | ArrayBuffer | null;
  localImgUrl!: string | ArrayBuffer | null;
  student!: StudentModel;
  pipe = new DatePipe('en-US');
  listId: string[]= []
  fileToUpload!: File | null;
  elements: CourseModel[] = [];
  headElements = ['#', 'name', 'student quantity', 'lesson quantity', 'status' , 'command'];
  loadingDelete = false;
  loadingUpdate = false;
  public saveButtonClicked: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder,
              private studentService: StudentService,
              private modalService: MDBModalService,
              private commonService: CommonService,
              private storage: AngularFireStorage,
              private courseService: CourseService) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      password: ['', Validators.required],
      birthDay: ['', Validators.required],
    });
    this.commonService.currentUser.subscribe(res => {
      this.currentUser = res;
    });
  }

  get f(): any {
    return this.studentForm.controls;
  }

  ngOnInit(): void {
    if (this.student) {
      this.student.courses.forEach(value => {
        this.listId.push(value.course);
      })
      this.courseService.getCourseByStudent(this.listId).subscribe(res => {
          this.elements = res;
      })
      this.imgUrl = this.student.imgUrl;
      this.studentForm.setValue({
        email: this.student.email,
        name: this.student.name,
        location: this.student.location,
        birthDay: this.pipe.transform(new Date(this.student.birthDay), 'yyyy-MM-dd'),
        password: ''
      });

    }
  }

  conCreate(): void {
    this.mess = null;
    const teacherRequest: CreateTeacherRequestModel = {
      name: this.f.name.value,
      birthDay: this.f.birthDay.value,
      location: this.f.location.value,
      password: '111111',
      email: this.f.email.value,
      major: this.majorDefault,
      imgUrl: this.imgUrl
    };
    this.studentService.createStudent(teacherRequest).subscribe(res => {
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

  onCancel(course: string) {
    this.studentService.cancelCourse(course, this.student._id).subscribe(res => {
    });
    this.studentService.cancelCourseStudent(course, this.student._id).subscribe(value => {
      this.modalService.hide(1);
      this.saveButtonClicked.next(value);
    })
  }
  onDelete() {
    this.storage.storage.refFromURL(this.student.imgUrl).delete().then(r => {
      this.studentService.deleteStudent(this.student._id).subscribe(res => {
        this.loadingDelete = true;
        this.modalService.hide(1);
        this.saveButtonClicked.next(res);
      })
    });
  }

  onUpdate() {
    this.student.name = this.f.name.value;
    this.student.email = this.f.email.value;
    this.student.birthDay = this.f.birthDay.value;
    this.student.location = this.f.location.value;
    this.student.major = this.majorDefault;
    this.student.password = this.f.password.value;
    this.loadingUpdate = true;
    this.studentService.updateStudent(this.student).subscribe(res => {
      this.loadingUpdate = false;
      this.modalService.hide(1);
      this.saveButtonClicked.next(res);
    })
  }
}
