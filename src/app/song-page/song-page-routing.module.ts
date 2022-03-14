import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongPagePage } from './song-page.page';

const routes: Routes = [
  {
    path: '',
    component: SongPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongPagePageRoutingModule {}
