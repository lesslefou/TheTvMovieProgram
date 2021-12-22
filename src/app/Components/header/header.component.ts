import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public propositions:string='';
  searchForm!:FormGroup;
  searchControl!:FormControl;
  typeSearch: boolean = true;
  boutonCheck:boolean = false

  @Output() public sidenavToggle = new EventEmitter();

  constructor(public dataService : DataService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('');
    this.searchForm = new FormGroup({
      search : this.searchControl
    });
  }

  //Ouverture de la page affichant les films en corrélation à la recherche effectuée
  research(){
    this.typeSearch = true;
    this.router.navigate(['/searchPage/'+this.propositions]);
  }

  //En fonction du click sur le déroulant dataType, on affiche l'api film ou tvShow
  public changeFilmOrtvShow(type:string){
    this.dataService.typesearchAsObservable.next(type);
  }


}
