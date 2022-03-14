import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouriteMainSongsListPageRoutingModule } from './favourite-main-songs-list-routing.module';

import { FavouriteMainSongsListPage } from './favourite-main-songs-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouriteMainSongsListPageRoutingModule
  ],
  declarations: [FavouriteMainSongsListPage]
})
export class FavouriteMainSongsListPageModule {}
