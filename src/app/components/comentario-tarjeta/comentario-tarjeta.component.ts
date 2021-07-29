import { Component, Input, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/models/usuario.model';
import { UsuariosService } from '../../servicios/usuarios.service';
import { comentario } from '../../../models/comentarios.model';

@Component({
  selector: 'app-comentario-tarjeta',
  templateUrl: './comentario-tarjeta.component.html',
  styleUrls: ['./comentario-tarjeta.component.css']
})
export class ComentarioTarjetaComponent implements OnInit {

  @Input() comentarios: comentario;
  usuario: UsuarioModel;
  obtenerUser: UsuarioModel[];
  load: boolean;
  constructor(private _userService: UsuariosService) { 
  }

  ngOnInit(): void {
    this.load = true;
    setTimeout(() => {
      setTimeout(() => {
        this.usuario = this.obtenerUser[0];
        this.load = false;
      }, 400);
      this.obtenerUser = this._userService.getUsuario(this.comentarios.userID);
    }, 300);
  }

}
