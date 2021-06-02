import {NgModule} from '@angular/core';
import { ManagementComponent } from './pages/management/management.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { CreateDocumentComponent } from './pages/create-document/create-document.component';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import { DetailDocumentComponent } from './pages/detail-document/detail-document.component';
const routes: Routes = [
  {path: '', component: ManagementComponent},
  {path: 'create', component: CreateDocumentComponent},
  {path: 'detail/:id', component: DetailDocumentComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, NgxDocViewerModule],
  exports: [],
  declarations: [ManagementComponent, CreateDocumentComponent, DetailDocumentComponent]
})
export class DocumentManagementModule {
}
