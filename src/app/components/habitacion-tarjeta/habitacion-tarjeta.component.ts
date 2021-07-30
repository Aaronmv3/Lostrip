import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Habitacion } from 'src/models/habitaciones.model';
import {faTrashAlt, faUsers} from '@fortawesome/free-solid-svg-icons';
import { CorreoService } from 'src/app/servicios/correo.service';
import { Alojamiento } from '../../../models/alojamientos.model';
import { UsuarioModel } from 'src/models/usuario.model';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../servicios/usuarios.service';
@Component({
  selector: 'app-habitacion-tarjeta',
  templateUrl: './habitacion-tarjeta.component.html',
  styleUrls: ['./habitacion-tarjeta.component.css']
})
export class HabitacionTarjetaComponent implements OnInit {

  @Input() habitacion: Habitacion;
  @Input() usuario: UsuarioModel[];
  @Input() alojamiento: Alojamiento;
  @Output('borrar') evento = new EventEmitter<Habitacion>(); 
  foto: String;
  faDelete = faTrashAlt;
  faUsers = faUsers;
  ruta: string;
  constructor(private router: Router, config: NgbCarouselConfig, private modalService: NgbModal,  private correo: CorreoService, private userService: UsuariosService) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
    config.showNavigationArrows = false;
   }

  ngOnInit(): void {
    this.ruta = this.router.url;
    
  }

  openVerticallyCentered(content, foto: String) {
    
    this.foto = foto;

    this.modalService.open(content, { windowClass: 'modal-custom'} );
  }

  solicitar(){
    if(sessionStorage.getItem("Logged")){
      Swal.showLoading();
      this.userService.anadirReserva(this.alojamiento.id.toString(), this.usuario[0].userID).subscribe(()=>{
        this.correo.enviar(this.usuario[0].email,this.alojamiento.nombre, this.usuario[0].nombre).subscribe(()=>{
          Swal.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha solicitado la reserva correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        });
      })
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al solicitar reserva',
        text:"Inicie sesion con su cuenta o cree una para la reserva",
        showConfirmButton: false,
        timer: 2500
      })
    }
  }
  borrarHabitacion(habitacion : Habitacion){
      this.evento.emit(habitacion);
  }
}
