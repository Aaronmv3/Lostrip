import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { UsuarioModel } from 'src/models/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
//Variables
  //variables locales
  usuario: UsuarioModel;
  usuarioNuevo: UsuarioModel;
  captcha: string;
  //booleanos
  recordarme = false;
  constructor(private auth: AuthService, private router: Router, private userServ: UsuariosService) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();

  }
  //Crea un usuario en firebase y lo crea tambien en la base de datos, tambien envia un correo de verificacion
  onSubmit(form: NgForm){
    if (form.invalid){ return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.auth.registrar(this.usuario.email, this.usuario.password).then(resp => {
      
      this.usuarioNuevo = {
        userID : resp.user.uid,
        nombre : this.usuario.nombre,
        email : this.usuario.email,
        usuarioRol: "NORMAL",
        fotoPerfil: "/assets/Imagenes/usuarios/user.jpg"
      } 

      this.userServ.crearUsuario(this.usuarioNuevo).subscribe(data=>{
      });
      Swal.close();
      this.auth.verificacion();
      this.auth.logout();
      this.router.navigate(["/home"]);
    }).catch(error=>{
      Swal.fire({
        title: 'Error al autenticar',
        icon: 'error',
        text: error.message
      });
    });
  }
  resolved(e){

  }

}