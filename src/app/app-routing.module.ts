import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActuelPageComponent } from './Pages/actuel-page/actuel-page.component';
import { FuturPageComponent } from './Pages/futur-page/futur-page.component';
import { InformationPageComponent } from './Pages/information-page/information-page.component';
import { SearchPageComponent } from './Pages/search-page/search-page.component';
import { TopPageComponent } from './Pages/top-page/top-page.component';

const routes: Routes = [
  { path: '', component: ActuelPageComponent },
  { path: 'futurPage', component: FuturPageComponent },
  { path: 'topPage', component: TopPageComponent },
  { path: 'film/:id', component: InformationPageComponent },
  { path: 'tvShow/:id', component: InformationPageComponent },
  { path: 'searchPage/:name', component: SearchPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
