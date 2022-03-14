import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutSymphonyPage } from './about-symphony.page';

const routes: Routes = [
  {
    path: '',
    component: AboutSymphonyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutSymphonyPageRoutingModule {}
