import { Component, OnInit } from '@angular/core';
import {CourseModel} from '../../../../core/models/course.model';
import {CommonService} from '../../../../core/services/common.service';
import {UserInfoModel} from '../../../../core/models/user-info.model';
import {CourseService} from '../../../../core/services/course.service';
import {DocumentService} from '../../../../core/services/document.service';
import {DocumentRequestModel} from '../../../../core/models/document-request.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {

  courseSelected!: CourseModel;
  currentUser!: UserInfoModel;
  courses: CourseModel[] = [];
  doc = '';
  name = '';
  loading = false;
  constructor(private commonService: CommonService,
              private courseService: CourseService,
              private documentService: DocumentService,
              private router: Router) { }

  ngOnInit(): void {
    this.commonService.currentUser.subscribe(res => {
      this.currentUser = res;
      this.courseService.getCourseOfTeacher(this.currentUser._id).subscribe(res => {
        this.courses = res;
      });
    })
  }

  conChange(value: any) {
    this.courseSelected = value;
  }
  onSave() {
    this.loading = true;
    const documentReq: DocumentRequestModel = {
      name: this.name,
      course: this.courseSelected._id,
      link: this.doc
    }
    this.documentService.createDocument(documentReq).subscribe(res => {
      this.loading = false;
      this.router.navigate(['/document-management'])
    }, error => this.loading = false)
  }

}
