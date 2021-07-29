import { Component, OnInit } from '@angular/core';
import {faFacebookF, faGooglePlus} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  // Importacion de iconos
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faGooglePlus = faGooglePlus;

  //Variables
  vecesEntrado = 0;
  aceptada: string;

  constructor() { }
  ngOnInit(): void {
    this.vecesEntrado = parseInt(document.cookie.split("=")[1]) + 1;

    if(document.cookie == ''){
      this.aceptada = 'initial'
    }else{
      this.aceptada = 'none'
      document.cookie = "veces=" + this.vecesEntrado;
    }
    
  }

  
  aceptarCookies(){
    this.aceptada = 'none';
    this.vecesEntrado = 1
    document.cookie = "veces=" + this.vecesEntrado + "; expires=Thu, 1 Jan 2022 12:00:00 UTC";
    
  }

}
