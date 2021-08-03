import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Alojamiento } from 'src/models/alojamientos.model';
import { AlojamientosService } from '../../servicios/alojamientos.service';
import {faArrowLeft, faGift} from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModel } from 'src/models/usuario.model';
import { UsuariosService } from '../../servicios/usuarios.service';


@Component({
  selector: 'app-alojamiento',
  templateUrl: './alojamiento.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./alojamiento.component.css']
})
export class AlojamientoComponent implements OnInit {
//Variables
  //Iconos
  faArrowLeft = faArrowLeft;
  faGift = faGift;

  //variables locales
  alojamiento: Alojamiento;
  obtenerAloj: Alojamiento[];
  foto: String;
  obtenerUsuario: UsuarioModel[];
  usuarios: UsuarioModel[];

  //Booleanos
  load: boolean = true;

  //Paginacion
  pagina = 1;
  pageSize = 5;
  constructor(private routerAct : ActivatedRoute, private _alojamientoService : AlojamientosService, private location: Location, private modalService: NgbModal, 
    config: NgbCarouselConfig, private userService: UsuariosService) { 
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
    config.showNavigationIndicators = true;
    config.showNavigationArrows = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
      setTimeout(() => {
        this.alojamiento = this.obtenerAloj[0];
        if(sessionStorage.getItem("Logged")){
          this.obtenerUsuario = this.userService.getUsuario(sessionStorage.getItem("Logged"));
        }
        
        this.load = false;
      }, 600);
      this.routerAct.params.subscribe(params => {
        this.obtenerAloj = this._alojamientoService.getAlojamiento(params.id);
        
      });
    }, 500);
  } 
  //Vuelve a la pagina anterior
  atras(){
    this.location.back();
  }
  //Abre la foto en una ventana modal
  openVerticallyCentered(content, foto: String) {
    
    this.foto = foto;

    this.modalService.open(content, { windowClass: 'modal-custom'} );
  }
}
