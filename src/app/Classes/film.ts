export class Film {

  id:number;
  title:string;
  release_date:string;
  poster_path:any;
  overview:string;
  popularity:number;


  constructor(id: number, poster_path:any, title:string, release_date:string, overview:string, popularity:number) {
      this.id = id;
      this.title = title;
      this.release_date = release_date;
      this.poster_path = poster_path;
      this.overview = overview;
      this.popularity=popularity;
  }
}
