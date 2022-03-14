import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutSymphonyPageRoutingModule } from './about-symphony-routing.module';

import { AboutSymphonyPage } from './about-symphony.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutSymphonyPageRoutingModule
  ],
  declarations: [AboutSymphonyPage]
})
export class AboutSymphonyPageModule {}
