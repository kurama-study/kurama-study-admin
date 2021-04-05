import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    MDBBootstrapModule.forRoot(),
  ],
  exports: [
    MDBBootstrapModule,
    CommonModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {
}
