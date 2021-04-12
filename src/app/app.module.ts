import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FeatureModule} from './feature/feature.module';
import {FeatureRouting} from './feature/feature.routing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './core/jwt.interceptor';
import { AngularFireModule } from '@angular/fire';
import {environment} from '../environments/environment';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FeatureModule,
    FeatureRouting,
    AngularFireModule.initializeApp(environment.firebaseConfig),

],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: BUCKET, useValue: 'gs://kurama-admin.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
