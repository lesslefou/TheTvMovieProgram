import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent implements OnInit,OnDestroy {
  @Output() filmToReach = 'top'; //Permet d'indiquer la page où on est au template

  previousType:string='';
  subcription!:Subscription;

  constructor(private dataService: DataService) {
    //Souscription à l'observable typeSearch lorsqu'une nouvelle valeur est pushée par le next (switch entre film et tvShow)
    this.subcription = this.dataService.typesearchObservable.subscribe({

        next:data => {
          this.dataService.typesearch = data;
        }
      });
  }
  ngOnInit(): void {
    //permet de se repérer pour savoir si on est sur l'affichage de films ou de tvshows
    this.previousType = this.dataService.typesearch;
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
