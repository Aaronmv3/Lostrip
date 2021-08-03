import { Component, Input, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/models/usuario.model';
import { UsuariosService } from '../../servicios/usuarios.service';
import { comentario } from '../../../models/comentarios.model';
import { Router } from '@angular/router';
import { AlojamientosService } from '../../servicios/alojamientos.service';
import { Alojamiento } from '../../../models/alojamientos.model';

@Component({
  selector: 'app-comentario-tarjeta',
  templateUrl: './comentario-tarjeta.component.html',
  styleUrls: ['./comentario-tarjeta.component.css']
})
export class ComentarioTarjetaComponent implements OnInit {

  @Input() comentarios: comentario;
  @Input() alojamiento: Alojamiento;
  usuario: UsuarioModel;
  obtenerUser: UsuarioModel[];
  load: boolean;
  ruta: String;
  
  constructor(private _userService: UsuariosService, private router: Router, private _alojServ: AlojamientosService) { 
  }

  ngOnInit(): void {
    this.ruta = this.router.url;
    if(this.ruta != '/comentarios'){ 
      this.load = true;
      this.obtenerUser = [];
      setTimeout(() => {
        setTimeout(() => {
          this.obtenerUser.forEach(user =>{
            if(user.userID == this.comentarios.userID){
              this.usuario = user;
            }
          })
          this.load = false;       
          
        }, 400);
        this._userService.getUsuarios().subscribe((data:UsuarioModel[]) =>{
  
          this.obtenerUser = data;
          
        })
      }, 300);
    }
  }

}
