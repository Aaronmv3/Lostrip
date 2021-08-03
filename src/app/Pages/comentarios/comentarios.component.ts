import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from 'src/app/servicios/alojamientos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Alojamiento } from 'src/models/alojamientos.model';
import { UsuarioModel } from 'src/models/usuario.model';
import { comentario } from '../../../models/comentarios.model';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  obteneruser: UsuarioModel[];
  alojamientos: Alojamiento[];
  comentariosUser: comentario[] = [];

  //Paginacion
  page = 1;
  pageSize = 5;
  constructor(private alojServ: AlojamientosService, private userServ: UsuariosService) { }

  ngOnInit(): void {
    setTimeout(() => {
      setTimeout(() => {
        this.alojamientos.forEach(alojamiento =>{
          alojamiento.comentarios.forEach(comentario => {
            if(comentario.userID == this.obteneruser[0].userID){
              this.comentariosUser.push(comentario);
            }
          })
        })   
        console.log(this.comentariosUser);
      }, 600);
      this.alojamientos = this.alojServ.getAlojamientos();
      this.obteneruser = this.userServ.getUsuario(sessionStorage.getItem("Logged"));
    }, 400);
  }
  

}
