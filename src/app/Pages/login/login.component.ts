import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioModel } from 'src/models/usuario.model';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  captcha: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid){ return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.auth.loggin(this.usuario.email, this.usuario.password).then(mensage=>{
      Swal.close();
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email)
      }

      let user = this.auth.obtenerUsuario();
      if(user.emailVerified == false){
        Swal.fire({
          title: 'Error al autenticar',
          icon: 'error',
          text: 'Debes verificar el email antes de acceder',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Mandar de nuevo',
          cancelButtonText: 'Cerrar ventana'
  
        }).then((result) =>{
          if(result.isConfirmed) {
            this.auth.verificacion();
            this.auth.logout();
          }else{
            this.auth.logout();
          }
        })
        
      }else{
        location.reload();
      }
    }).catch(err=>{
      Swal.fire({
        title: 'Error al autenticar',
        icon: 'error',
        text: err.message

      });
    });
  }

  async contrasenaRec(){
    
    const { value: email } = await Swal.fire({
    title: 'Introduce tu email',
    input: 'email',
    inputLabel: 'Restablecer contraseña',
    inputPlaceholder: 'Pon tu correo electronico',
    showCancelButton: true,
    confirmButtonText: 'Enviar',
  })
  
  if (email) {
    this.auth.reseteoContrasena(email);
  }
  }

  resolved(e){    
  }
}