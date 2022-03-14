import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouriteMainSongsListPage } from './favourite-main-songs-list.page';

const routes: Routes = [
  {
    path: '',
    component: FavouriteMainSongsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouriteMainSongsListPageRoutingModule {}
