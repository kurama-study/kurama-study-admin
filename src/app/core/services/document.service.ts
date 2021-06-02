import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {DocumentRequestModel} from '../models/document-request.model';
import {Observable} from 'rxjs';
import {DocumentModel} from '../models/document.model';

@Injectable({providedIn: 'root'})
export class DocumentService extends CommonService {
  createDocument(documentReq: DocumentRequestModel): Observable<any> {
    return this.post(this.CONST.ApiURI.CREATE_DOCUMENT, documentReq);
  }
  getListDocument(course: string): Observable<DocumentModel[]> {
    return this.post(this.CONST.ApiURI.GET_LIST_DOCUMENT, {course: course});
  }
  deleteDocument(id: string): Observable<any> {
    return this.post(this.CONST.ApiURI.DELETE_DOCUMENT, {id: id});
  }
}
