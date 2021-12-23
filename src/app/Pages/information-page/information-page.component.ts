import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-information-page',
  templateUrl: './information-page.component.html',
  styleUrls: ['./information-page.component.css']
})
export class InformationPageComponent implements OnInit,OnDestroy {
  dataToShow!:any;
  reviewToShow!:any;
  type!:number;
  imageShow:any;
  imageLoad:boolean = false;
  subscription!:Subscription;
  subscription2!:Subscription;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap.pipe(
      map((data: ParamMap) => data.get('id')), //récupération de l'id passé en chemin
      switchMap( (id) => {
        if (id !==null ) {
          //traitement de l'id car il se compose de l'id + {1,2} en fonction de s'il s'agit d'un film ou tvshow
          let taille = id.length;
          this.type = parseInt(id.substring(taille-1,taille), 10);
          return this.dataService.getInformation(parseInt(id.substring(0,taille-1), 10), this.type);
        }
        else return of(null);
      })
    ).subscribe(
      (dataToShow) => { this.dataToShow = dataToShow,
        this.imageLoad=true;
        //abonnement à l'api permettant de récupérer les images
        this.dataService.getImage(this.dataToShow.poster_path).toPromise().then(
          (img) => {
            this.createImage(img);
            this.imageLoad= false;
          },
          (err) => {
            this.imageLoad=false;
            console.error('InformationPageComponent',err);
          });
        }
    );

    this.subscription2 = this.activatedRoute.paramMap.pipe(
      map((data: ParamMap) => data.get('id')), //récupération de l'id passé en chemin
      switchMap( (id) => {
        if (id !==null ) {
          //traitement de l'id car il se compose de l'id + {1,2} en fonction de s'il s'agit d'un film ou tvshow
          let taille = id.length;
          this.type = parseInt(id.substring(taille-1,taille), 10);
          return this.dataService.getReviews(parseInt(id.substring(0,taille-1), 10), this.type);
        }
        else return of(null);
      })
    ).subscribe(
      (reviewToShow) => {
        this.reviewToShow = reviewToShow;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
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
