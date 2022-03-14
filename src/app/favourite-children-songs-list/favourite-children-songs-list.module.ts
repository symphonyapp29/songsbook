import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouriteChildrenSongsListPageRoutingModule } from './favourite-children-songs-list-routing.module';

import { FavouriteChildrenSongsListPage } from './favourite-children-songs-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouriteChildrenSongsListPageRoutingModule
  ],
  declarations: [FavouriteChildrenSongsListPage]
})
export class FavouriteChildrenSongsListPageModule {}
