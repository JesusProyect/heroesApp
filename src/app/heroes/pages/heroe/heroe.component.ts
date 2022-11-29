import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, map, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img{
        width: 100%;
        border-radius: 5px;
      } 
    `

  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    private route: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params  
      .pipe(
        switchMap( ({ id }) => this.heroeService.getHeroesPorId(id) ) 
      )
      .subscribe( heroe => this.heroe = heroe );
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }


/*
  YO HABIA HECHO ESTO PERO CON EL SWICTHMAP SE VE MAS BONITO Y ES MEJOR PRACTICA ENTIENDO
  ngOnInit(): void {
    this.route.params  
      .subscribe( 
        ({id}) => 
            this.heroeService.getHeroesPorId(id)
              .subscribe( (heroe) => this.heroe = heroe) );
  }


*/

}
