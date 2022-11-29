import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;
  //sinResultados: boolean = false;
  //guardaTermino: string = '';

  constructor( private heroesServerice: HeroesService) { }

  ngOnInit(): void {
  }
  buscando( ){
    this.heroesServerice.getSugerencia( this.termino.trim() )
      .subscribe( heroes => this.heroes = heroes);
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {
   
    if( !event.option.value ){
      this.heroeSeleccionado = undefined;
      return;
    }
      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;

      this.heroesServerice.getHeroesPorId( heroe.id! )
       .subscribe( heroe => this.heroeSeleccionado = heroe );
    
  }


 /*
 ESTA FUE MI SOLUCION VOY A DEJAR LA QUE EL HIZO
 buscando( ){
    this.heroesServerice.getSugerencia( this.termino )
      .subscribe( heroes => {this.heroes = heroes; this.guardaTermino = this.termino});
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {
   
    if( event.option.value){
       const heroe: Heroe = event.option.value;
       this.termino = heroe.superhero;

       this.heroesServerice.getHeroesPorId( heroe.id! )
        .subscribe( heroe => this.heroeSeleccionado = heroe );

        this.sinResultados = false;
    }
    else{
      this.sinResultados = true;
    }
    
  } */

}
