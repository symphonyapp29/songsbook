import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongsListPageRoutingModule } from './songs-list-routing.module';

import { SongsListPage } from './songs-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongsListPageRoutingModule
  ],
  declarations: [SongsListPage]
})
export class SongsListPageModule {}
