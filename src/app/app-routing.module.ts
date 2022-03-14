import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'songs-list',
    loadChildren: () => import('./songs-list/songs-list.module').then( m => m.SongsListPageModule)
  },
  {
    path: 'membership',
    loadChildren: () => import('./membership/membership.module').then( m => m.MembershipPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'about-jeevaswaralu',
    loadChildren: () => import('./about-jeevaswaralu/about-jeevaswaralu.module').then( m => m.AboutJeevaswaraluPageModule)
  },
  {
    path: 'about-symphony',
    loadChildren: () => import('./about-symphony/about-symphony.module').then( m => m.AboutSymphonyPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'children-songs',
    loadChildren: () => import('./children-songs/children-songs.module').then( m => m.ChildrenSongsPageModule)
  },
  {
    path: 'song-page',
    loadChildren: () => import('./song-page/song-page.module').then( m => m.SongPagePageModule)
  },
  {
    path: 'favourite-main-songs-list',
    loadChildren: () => import('./favourite-main-songs-list/favourite-main-songs-list.module').then( m => m.FavouriteMainSongsListPageModule)
  },
  {
    path: 'favourite-children-songs-list',
    loadChildren: () => import('./favourite-children-songs-list/favourite-children-songs-list.module').then( m => m.FavouriteChildrenSongsListPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'test-menu',
    loadChildren: () => import('./test-menu/test-menu.module').then( m => m.TestMenuPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
