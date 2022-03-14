import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouriteChildrenSongsListPage } from './favourite-children-songs-list.page';

const routes: Routes = [
  {
    path: '',
    component: FavouriteChildrenSongsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouriteChildrenSongsListPageRoutingModule {}
