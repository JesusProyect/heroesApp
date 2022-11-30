import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img{
        width: 100%;
      border-radius: 5px;
      }
    `
    ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id:'DC Comics',
      desc:'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img:''
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit(): void {

    if( !this.router.url.includes( 'editar' ) ){
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroesPorId(id))
      )
      .subscribe( heroe => this.heroe = heroe )

  }

  guardar(){
    
    if( this.heroe.superhero.trim().length === 0 ) {
      return
    } 

    if( this.heroe.id ){ 
      this.heroesService.actualizarHeroe( this.heroe )
      .subscribe( heroe => {
        this.heroe = heroe;
        this.mostrarSnackbar( 'Registro Actualizado' );
      });
    }
    else{
      this.heroesService.agregarHeroe( this.heroe )
      .subscribe( heroe => {
          this.router.navigate(['/heroes/editar',heroe.id]);
          this.mostrarSnackbar( 'Registro Creado' );
        } );
    }
    
  }

  borrarHeroe(){

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe }
    } );

    dialog.afterClosed()
      .pipe(
        switchMap( ( result ) => ( result ) ? this.heroesService.borrarHeroe( this.heroe.id! ) : of(undefined) )
      )
      .subscribe( resp => {
              if( resp ){this.router.navigate(['/heroes']);}
            });
        }
      
  mostrarSnackbar(  mensaje: string ): void { 
    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    } );
  }

  imgDefault( event: any ){
    event.target.src = 'assets/no-image.png';
  }

}
