import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutJeevaswaraluPage } from './about-jeevaswaralu.page';

const routes: Routes = [
  {
    path: '',
    component: AboutJeevaswaraluPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutJeevaswaraluPageRoutingModule {}
