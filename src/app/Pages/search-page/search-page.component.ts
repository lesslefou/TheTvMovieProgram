import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit,OnDestroy {
  films!:any;
  tvShows!:any;
  imageShow:any;
  imageLoad:boolean = false;
  subscription!: Subscription;
  subscription2!: Subscription;
  previousType:string='';

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //souscription à l'api des films
    this.subscription = this.activatedRoute.paramMap.pipe(
      map((data: ParamMap) => data.get('name')),
      switchMap( (name) => {
        if (name !== 'No result' ){
          return this.dataService.searchMovie(name || '');
        }
        else return of('No result');
      })
    ).subscribe(
      (data: any) =>
      {
        this.films = data.results;
      },
      error=>{
        console.log('ngOnInit-SearchFilm',error);
        this.subscription.unsubscribe();
      }
    );

    //souscription à l'api des tvShows
    this.subscription2 = this.activatedRoute.paramMap.pipe(
      map((data: ParamMap) => data.get('name')),
      switchMap( (name) => {
        if (name !== 'No result' ){
          return this.dataService.searchTvShow(name || '');
        }
        else return of('No result');
      })
    ).subscribe(
      (data: any) =>
      {
        this.tvShows = data.results;
      },
      error=>{
        console.log('ngOnInit-SearchFilm',error);
        this.subscription2.unsubscribe();
      }
    );
    this.previousType = this.dataService.typesearch;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }



}
