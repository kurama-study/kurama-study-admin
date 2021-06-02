import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentService} from '../../../../core/services/document.service';
import {DocumentModel} from '../../../../core/models/document.model';

@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.scss']
})
export class DetailDocumentComponent implements OnInit {

  courseId: any;
  documents!: DocumentModel[]
  doc = '';
  loading = false;
  document!: DocumentModel;
  constructor(private route: ActivatedRoute, private documentService: DocumentService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(param => {
          this.courseId = param.get('id');
          if (this.courseId) {
            this.documentService.getListDocument(this.courseId).subscribe((res) => {
              this.documents = res;
            })
          }
        }
      );
  }

  onDetail(doc: DocumentModel) {
    this.document = doc
    this.doc = doc.link;
  }
  onDelete() {
    this.loading = true;
    this.documentService.deleteDocument(this.document._id).subscribe(res => {
      this.loading = false;
      this.doc = '';
      this.documentService.getListDocument(this.courseId).subscribe((res) => {
        this.documents = res;
      })
    }, error => this.loading = false)
  }

}
