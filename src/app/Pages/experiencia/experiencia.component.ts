import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faGift } from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experiencias } from 'src/models/experiencias.model';
import { ExperienciasService } from '../../servicios/experiencias.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
//Variables
  //Iconos
  faArrowLeft = faArrowLeft;
  faGift = faGift;

  //Variables locales
  experiencia: Experiencias;
  obtenerExp: Experiencias[];
  foto: String;

  //Booleanos
  load: boolean = true;

  constructor(private routerAct : ActivatedRoute, private _expServ : ExperienciasService, private location: Location, private modalService: NgbModal, 
    config: NgbCarouselConfig) { 
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
        this.experiencia = this.obtenerExp[0];
        console.log(this.experiencia);
        
        this.load = false;
        
      }, 600);
      this.routerAct.params.subscribe(params => {
        this.obtenerExp = this._expServ.getExperiencia(params.id);
        
      });
    }, 500);

  }
  //Vuelve a la pagina anterior
  atras(){
    this.location.back();
  }
  //Abre una ventana modal con la imagen seleccionada
  openVerticallyCentered(content, foto: String) {
    
    this.foto = foto;

    this.modalService.open(content, { windowClass: 'modal-custom'} );
  }
}
