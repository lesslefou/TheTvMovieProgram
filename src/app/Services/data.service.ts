import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  typeApi!:string;
  api_key:string = environment.apiKey;
  url:string='';

  //film value observable
  typesearch:string='movies';
  typesearchAsObservable = new Subject<string>();
  typesearchObservable:Observable<string>= this.typesearchAsObservable.asObservable();

  constructor(private http: HttpClient) {
    this.typesearchAsObservable.next(this.typesearch);
   }

  //Permet de récupérer l'image d'un lien de api via un autre lien de cette api
  getImage(path:string): Observable<Blob> {
    this.typeApi = 'now_playing?';
    let url:string=environment.urlImage.url+path;
    return this.http.get(url,{responseType:'blob'});
  }

  //Concaténation de plusieurs variables permettant de creer un url de recherche
  createUrl(baseUrl:string, typeApi:string):string{
    return baseUrl + typeApi + this.api_key;
  }

  //permet de récupérer les films ou tvShows (en fonction de typeSearch) actuels à partir d'un lien api
  getActuel(): Observable<any> {
    if(this.typesearch === 'movies'){
      this.url= this.createUrl(environment.urlMovie.url,'now_playing?');
    }
    else{
      this.url= this.createUrl(environment.urlTv.url,'on_the_air?');
    }
    return this.http.get<any>(this.url)
      .pipe(
        map( (data: any) => data.results)
      );
  }

  //permet de récupérer les films ou tvShows (en fonction de typeSearch) futurs à partir d'un lien api
  getFutur(): Observable<any> {
    this.url= this.createUrl(environment.urlMovie.url,'upcoming?');
    return this.http.get<any>(this.url).pipe(
      map( (data: any) => data.results )
    );
  }

  //permet de récupérer les films ou tvShows (en fonction de typeSearch) tendances à partir d'un lien api
  getTop(): Observable<any> {
    if(this.typesearch === 'movies'){
      this.url= this.createUrl(environment.urlMovie.url,'popular?');
    }
    else{
      this.url= this.createUrl(environment.urlTv.url,'popular?');
    }
    return this.http.get<any>(this.url).pipe(
      map( (data: any) => data.results)
    );
  }

  //permet de récupérer les informations d'un film ou tvShow (en fonction de type) à partir d'un lien api
  //type=1:film      type=2:tvshow
  getInformation(id: number, type:number):  Observable<any> {
    if(type === 1){
      this.url= this.createUrl(environment.urlMovie.url,(id + '?'));
    }
    else{
      this.url= this.createUrl(environment.urlTv.url,(id + '?'));
    }
    return this.http.get<any>(this.url).pipe(
      map( (data: any) => data )
    );
  }

  //permet de récupérer les avis des utilisateurs d'un film ou tvShow (en fonction de type) à partir d'un lien api
  //type=1:film      type=2:tvshow
  getReviews(id: number, type:number):  Observable<any> {
    if(type === 1){
      this.url= this.createUrl(environment.urlMovie.url,(id + '/reviews?'));
    }
    else{
      this.url= this.createUrl(environment.urlTv.url,(id + '/reviews?'));
    }
    return this.http.get<any>(this.url).pipe(
      map( (data: any) => data )
    );
  }


  //permet de récupérer les films ayant le mot recherché dans leur titre à partir d'un lien api
  searchMovie(query: string): Observable<Array<string>> {
    this.url= this.createUrl(environment.urlSearch.url,('movie?&query=' + query + '&'));
    return this.http.get<any>(this.url).pipe(
      map( (data: any) => data )
    );
  }

  //permet de récupérer les tvshows ayant le mot recherché dans leur titre à partir d'un lien api
  searchTvShow(query: string): Observable<Array<string>> {
    this.url= this.createUrl(environment.urlSearch.url,('tv?&query=' + query + '&'));
    return this.http.get<any>(this.url).pipe(
      map( (data: any) => data )
    );
  }

}

