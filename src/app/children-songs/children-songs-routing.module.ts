import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildrenSongsPage } from './children-songs.page';

const routes: Routes = [
  {
    path: '',
    component: ChildrenSongsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildrenSongsPageRoutingModule {}
