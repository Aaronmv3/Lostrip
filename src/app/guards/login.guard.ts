import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuariosService } from '../servicios/usuarios.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
  constructor(private user: UsuariosService, private router: Router){}
  //Valida si el usuario esta loggeado y lo redirige a home si lo está
  canActivate(): boolean  {
    if(sessionStorage.getItem("Logged") && sessionStorage.getItem("Logged").length == 28 ){
      this.router.navigateByUrl("/home")
    }else{
      return true;
    }
  }

}
