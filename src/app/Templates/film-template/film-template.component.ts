import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../Classes/film';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-film-template',
  templateUrl: './film-template.component.html',
  styleUrls: ['./film-template.component.css']
})
export class FilmTemplateComponent implements OnInit {


  @Input() film!: Film;
  imageShow:any;
  imageLoad:boolean = false;

  constructor(
    private dataService:DataService) { }

  ngOnInit(): void {
    this.imageLoad=true;
    //abonnement à l'api permettant de récupérer les images
    this.dataService.getImage(this.film.poster_path).subscribe(
      (img) => {
        this.createImage(img);
        this.imageLoad= false;
      },
      (err) => {
        this.imageLoad=false;
        console.error(err);
      });

  }

  //récupération d'un fichier contenant l'image avec création par la suite de cette dernière
  private createImage(image:Blob){
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      ()=>{
        this.imageShow = reader.result;
      },
      false);

    if(image){
      reader.readAsDataURL(image);
    }
  }

}
