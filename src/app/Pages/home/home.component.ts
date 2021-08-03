import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from '../../servicios/alojamientos.service';
import { Router } from '@angular/router';
import { BusquedaService } from '../../servicios/busqueda.service';
import { Alojamiento } from 'src/models/alojamientos.model';
import { UsuariosService } from '../../servicios/usuarios.service';
import { UsuarioModel } from 'src/models/usuario.model';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Variables locales
  alojamientos: Alojamiento[] = [];
  AlojamientosOferta: Alojamiento[] = [];
  mensaje: String;

  constructor( private _alojamientosService: AlojamientosService,
    private router: Router, private _busquedaService: BusquedaService, private _usuariosService: UsuariosService) {
  }
  
  
  ngOnInit(): void {
    this._busquedaService.pasarBusqueda = undefined;
    this.alojamientos = this._alojamientosService.getAlojamientos();
  
    setTimeout(()=>{
      this.AlojamientosOferta = this.alojamientos.filter(alojamientos => alojamientos.oferta == true);
    }, 100)

    if (sessionStorage.getItem("borrado") == "si") {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se ha eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        sessionStorage.removeItem('borrado');
      });
    }else if (sessionStorage.getItem("borrado") == "no") {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No se ha eliminado el usuario',
        text:"Vuelva a iniciar sesion para intentarlo",
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        sessionStorage.removeItem('borrado');
      });
    }
    
    if (sessionStorage.getItem("creado") == "si") {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se ha creado correctamente',
        text: "Por favor verifique su correo para iniciar sesion",
        showConfirmButton: false,
        timer: 2100
      }).then(()=>{
        sessionStorage.removeItem('creado');
      });
    }
    


  }
}


