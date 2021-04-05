import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import { NavbarComponent } from './main-layouts/navbar/navbar.component';
import { HeaderComponent } from './main-layouts/header/header.component';
import { FooterComponent } from './main-layouts/footer/footer.component';
import {FeatureRouting} from './feature.routing';

@NgModule({
  imports: [SharedModule, CoreModule, FeatureRouting],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  declarations: [NavbarComponent, HeaderComponent, FooterComponent]
})
export class FeatureModule {}
