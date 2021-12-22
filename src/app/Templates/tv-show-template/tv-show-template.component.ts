import { Component, Input, OnInit } from '@angular/core';
import { TvShow } from '../../Classes/tvShow';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-tv-show-template',
  templateUrl: './tv-show-template.component.html',
  styleUrls: ['./tv-show-template.component.css']
})
export class TvShowTemplateComponent implements OnInit {


  @Input() tvShow!: TvShow;
  imageShow:any;
  imageLoad:boolean = false;

  constructor(
    private dataService:DataService) { }

  ngOnInit(): void {
    this.imageLoad=true;
    //abonnement à l'api permettant de récupérer les images
    this.dataService.getImage(this.tvShow.poster_path).subscribe(
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
