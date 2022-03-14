import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongsListPage } from './songs-list.page';

const routes: Routes = [
  {
    path: '',
    component: SongsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongsListPageRoutingModule {}
