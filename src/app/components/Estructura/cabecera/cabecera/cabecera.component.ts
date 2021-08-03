import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faFacebookF, faGooglePlus, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../../../servicios/auth.service';
import { UsuarioModel } from '../../../../../models/usuario.model';
import { UsuariosService } from '../../../../servicios/usuarios.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  //Variables
    // Importacion de iconos
    faFacebookF = faFacebookF;
    faTwitter = faTwitter;
    faGooglePlus = faGooglePlus;

    //variables locales
    render = false;
    usuario : UsuarioModel;
    obteneruser: UsuarioModel[];
    uid: string;
    //Booleanos
    autenticado: boolean;
  constructor(private _authservice: AuthService, private router: Router, private _userService: UsuariosService) {
  }


  ngOnInit(): void {
    if(sessionStorage.getItem("Logged")){

      setTimeout(() => {
          setTimeout(() => {
            this.usuario = this.obteneruser[0];
            this.autenticado = true;
          }, 500);
          this.obteneruser = this._userService.getUsuario(sessionStorage.getItem("Logged"));
        }, 400);

    } else{
      this.autenticado = false;
    }

  }
  //Hacer logout del usuario actual
  logout(){
    this._authservice.logout();
    this.autenticado = false;
    this.router.navigateByUrl("/home");
  }


  }

