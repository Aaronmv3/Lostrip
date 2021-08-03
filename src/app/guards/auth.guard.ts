import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}
  //Valida si el usuario esta loggeado, si no lo redirije a login
  canActivate(): boolean  {

    if(sessionStorage.getItem("Logged") && sessionStorage.getItem("Logged").length == 28 ){
      return true;
    } else{
      this.router.navigateByUrl('/login');
    }
  }

}

