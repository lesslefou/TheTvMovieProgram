export class TvShow {

  id:number;
  name:string;
  first_air_date:string;
  poster_path:any;
  overview:string;
  popularity:number;


  constructor(id: number, poster_path:any, name:string, first_air_date:string, overview:string, popularity:number) {
      this.id = id;
      this.name = name;
      this.first_air_date = first_air_date;
      this.poster_path = poster_path;
      this.overview = overview;
      this.popularity=popularity;
  }
}
