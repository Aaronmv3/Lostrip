import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Habitacion } from 'src/models/habitaciones.model';
import {faTrashAlt, faUsers} from '@fortawesome/free-solid-svg-icons';
import { CorreoService } from 'src/app/servicios/correo.service';
import { Alojamiento, Reserva } from '../../../models/alojamientos.model';
import { UsuarioModel } from 'src/models/usuario.model';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../servicios/usuarios.service';
import { BusquedaService } from '../../servicios/busqueda.service';
@Component({
  selector: 'app-habitacion-tarjeta',
  templateUrl: './habitacion-tarjeta.component.html',
  styleUrls: ['./habitacion-tarjeta.component.css']
})
export class HabitacionTarjetaComponent implements OnInit {
//Variables
  //Inputs
  @Input() habitacion: Habitacion;
  @Input() usuario: UsuarioModel[];
  @Input() alojamiento: Alojamiento;
  //Outputs
  @Output('borrar') evento = new EventEmitter<Habitacion>(); 
  //Iconos
  faDelete = faTrashAlt;
  faUsers = faUsers;
  //variables locales
  foto: String;
  ruta: string;
  reserva: Reserva;

  constructor(private router: Router, config: NgbCarouselConfig, private modalService: NgbModal,  private correo: CorreoService, private userService: UsuariosService,
    private busquedaServ: BusquedaService) {
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
  //Para abrir la ventana modal y mostrar la imagen ampliada
  openVerticallyCentered(content, foto: String) {
    
    this.foto = foto;

    this.modalService.open(content, { windowClass: 'modal-custom'} );
  }

  //Envia un correo y guarda la reserva en el usuario
  solicitar(){
    if(sessionStorage.getItem("Logged")){
      Swal.showLoading();
      this.reserva = {
        alojamientoId: this.alojamiento.id,
        fechaEntrada: this.busquedaServ.pasarBusqueda.entrada.getDate() + "/" + this.busquedaServ.pasarBusqueda.entrada.getMonth() + "/" + this.busquedaServ.pasarBusqueda.entrada.getFullYear(),
        fechaSalida: this.busquedaServ.pasarBusqueda.salida.getDate() + "/" + this.busquedaServ.pasarBusqueda.salida.getMonth() + "/" + this.busquedaServ.pasarBusqueda.salida.getFullYear(),
        personas: this.busquedaServ.pasarBusqueda.numAdultos + this.busquedaServ.pasarBusqueda.numNinos,
      }
      console.log(this.reserva);
      

      this.userService.anadirReserva(this.reserva, this.usuario[0].userID).subscribe(()=>{
        this.reserva = {
          alojamientoId: this.alojamiento.id,
          fechaEntrada: this.busquedaServ.pasarBusqueda.entrada.getDate() + "/" + (this.busquedaServ.pasarBusqueda.entrada.getMonth()+1) + "/" + this.busquedaServ.pasarBusqueda.entrada.getFullYear(),
          fechaSalida: this.busquedaServ.pasarBusqueda.salida.getDate() + "/" + (this.busquedaServ.pasarBusqueda.salida.getMonth()+1) + "/" + this.busquedaServ.pasarBusqueda.salida.getFullYear(),
          personas: this.busquedaServ.pasarBusqueda.numAdultos + this.busquedaServ.pasarBusqueda.numNinos,
        }
        this.correo.enviar(this.usuario[0].email,this.alojamiento.nombre, this.usuario[0].nombre, this.reserva).subscribe(()=>{
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

  //Elimina una habitacion de un alojamiento
  borrarHabitacion(habitacion : Habitacion){
      this.evento.emit(habitacion);
  }
}
