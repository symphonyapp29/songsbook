import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestMenuPageRoutingModule } from './test-menu-routing.module';

import { TestMenuPage } from './test-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestMenuPageRoutingModule
  ],
  declarations: [TestMenuPage]
})
export class TestMenuPageModule {}
