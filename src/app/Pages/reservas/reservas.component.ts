import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/models/usuario.model';
import { AlojamientosService } from '../../servicios/alojamientos.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Alojamiento } from 'src/models/alojamientos.model';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
//Variables
  //Variables locales
  obteneruser: UsuarioModel[];
  alojamientos: Alojamiento[];
  alojamientosUser: Alojamiento[] = [];

  //Paginacion
  page = 1;
  pageSize = 5;
  constructor(private alojServ: AlojamientosService, private userServ: UsuariosService) { }

  ngOnInit(): void {
    setTimeout(() => {
      setTimeout(() => {
        this.alojamientos.forEach(alojamiento =>{
         this.obteneruser[0].reservas.forEach(reserva =>{
           if(alojamiento.id == reserva.alojamientoId){
             this.alojamientosUser.push(alojamiento);
           }
         })
        })
        
        console.log(this.alojamientosUser);
        
      }, 600);
      this.alojamientos = this.alojServ.getAlojamientos();
      this.obteneruser = this.userServ.getUsuario(sessionStorage.getItem("Logged"));
    }, 400);
  }

}
