import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildrenSongsPageRoutingModule } from './children-songs-routing.module';

import { ChildrenSongsPage } from './children-songs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildrenSongsPageRoutingModule
  ],
  declarations: [ChildrenSongsPage]
})
export class ChildrenSongsPageModule {}
