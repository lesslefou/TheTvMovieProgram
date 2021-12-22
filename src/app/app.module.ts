import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmTemplateComponent } from './Templates/film-template/film-template.component';
import { TvShowTemplateComponent } from './Templates/tv-show-template/tv-show-template.component';
import { ActuelPageComponent } from './Pages/actuel-page/actuel-page.component';
import { TopPageComponent } from './Pages/top-page/top-page.component';
import { FuturPageComponent } from './Pages/futur-page/futur-page.component';
import { InformationPageComponent } from './Pages/information-page/information-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SearchPageComponent } from './Pages/search-page/search-page.component';
import { AffichageTemplateComponent } from './Templates/affichage-template/affichage-template.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmTemplateComponent,
    TvShowTemplateComponent,
    ActuelPageComponent,
    TopPageComponent,
    FuturPageComponent,
    InformationPageComponent,
    HeaderComponent,
    FooterComponent,
    SearchPageComponent,
    AffichageTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
