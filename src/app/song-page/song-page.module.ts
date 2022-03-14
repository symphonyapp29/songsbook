import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongPagePageRoutingModule } from './song-page-routing.module';

import { SongPagePage } from './song-page.page';

import { SwipeModule } from '../swipe/swipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwipeModule,
    SongPagePageRoutingModule
  ],
  declarations: [SongPagePage]
})
export class SongPagePageModule {}
