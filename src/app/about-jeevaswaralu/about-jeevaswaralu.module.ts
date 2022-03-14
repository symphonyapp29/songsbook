import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutJeevaswaraluPageRoutingModule } from './about-jeevaswaralu-routing.module';

import { AboutJeevaswaraluPage } from './about-jeevaswaralu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutJeevaswaraluPageRoutingModule
  ],
  declarations: [AboutJeevaswaraluPage]
})
export class AboutJeevaswaraluPageModule {}
