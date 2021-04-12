import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [],
  imports: [
    MDBBootstrapModule.forRoot(),
    FormsModule,
    NgSelectModule
  ],
  exports: [
    MDBBootstrapModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
})
export class SharedModule {
}
