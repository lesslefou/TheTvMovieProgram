import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/Classes/film';
import { TvShow } from 'src/app/Classes/tvShow';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-affichage-template',
  templateUrl: './affichage-template.component.html',
  styleUrls: ['./affichage-template.component.css']
})
export class AffichageTemplateComponent implements OnInit,OnDestroy {
  @Input() functionToChoose = ''; //Récupération de la page sur laquelle on affiche le template

  films!: Array<Film>;
  tvShows!: Array<TvShow>;
  previousType:string='';
  subscription!:Subscription;

  constructor(private dataService: DataService) {
    this.subscription = this.dataService.typesearchObservable.subscribe({
        next:data => {
          this.dataService.typesearch = data;
          this.requestFilmOrTvShow();
        }
      });
  }
  ngOnInit(): void {
    this.requestFilmOrTvShow();
    this.previousType = this.dataService.typesearch;
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  //Permet de se souscrire à la bonne api en fonction de la page ou l'on doit afficher le contenu
  requestFilmOrTvShow(){
    switch(this.functionToChoose) {
      case 'actuel' :
        this.getActuel();
        break;
      case 'futur' :
        this.getFutur();
        break;
      case 'top' :
        this.getTop();
        break;
    }
  }

  /*En fonction de si l'utilisateur souhaite voir les films ou les tvshows on initialise
    films ou tvShows avec data et []*/
  getActuel() {
    this.dataService.getActuel().toPromise().then(
      (data) =>
        {
          if (this.dataService.typesearch === 'films'){
            this.films = data;
            this.tvShows = [];
          }
          else {
            this.films = [];
            this.tvShows = data;
          }
        }
    );
  }

  getFutur() {
    this.dataService.getFutur().toPromise().then(
      (data) =>
        {
          this.films = data;
        }
    );
  }

  getTop() {
    this.dataService.getTop().toPromise().then(
      (data) =>
        {
          if (this.dataService.typesearch === 'films'){
            this.films = data;
            this.tvShows = [];
          }
          else {
            this.films = [];
            this.tvShows = data;
          }
        }
    );
  }

  /*Fonctions permettant d'effectuer un tri de données*/
  public changeOrderAscTitle() {
    if (this.dataService.typesearch === 'films'){
      this.films.sort((a: { title: string; },b: { title: string; }) => a.title < b.title ? -1 :1);
    }
    else {
      this.tvShows.sort((a: { name: string; },b: { name: string; }) => a.name < b.name ? -1 :1);
    }
  }

  public changeOrderAscDate() {
    if (this.dataService.typesearch === 'films'){
      this.films.sort((a: { release_date: string; },b: { release_date: string; }) => a.release_date < b.release_date ? -1 :1);
    }
    else {
      this.tvShows.sort((a: { first_air_date: string; },b: { first_air_date: string; }) => a.first_air_date < b.first_air_date ? -1 :1);
    }
  }

  public changeOrderDescTitle() {
    if (this.dataService.typesearch === 'films'){
      this.films.sort((a: { title: string; },b: { title: string; }) => a.title > b.title ? -1 :1);
    }
    else {
      this.tvShows.sort((a: { name: string; },b: { name: string; }) => a.name > b.name ? -1 :1);
    }
  }

  public changeOrderDescDate() {
    if (this.dataService.typesearch === 'films'){
      this.films.sort((a: { release_date: string; },b: { release_date: string; }) => a.release_date > b.release_date ? -1 :1);
    }
    else {
      this.tvShows.sort((a: { first_air_date: string; },b: { first_air_date: string; }) => a.first_air_date > b.first_air_date ? -1 :1);
    }
  }

}
