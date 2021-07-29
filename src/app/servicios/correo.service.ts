import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  private mailURL = environment.mailURL;
  constructor(private http: HttpClient) { 
  }

  enviar(para: string, alojamientoNombre: string, usuarioNombre){
    const formData = new FormData();
    var correo: string = "Le confirmamos su solicitud de reserva a nombre de: " + usuarioNombre + " para el alojamiento: " +
    alojamientoNombre + ".\nEsperemos que disfrute de su estancia!";

    formData.append('to', para);
    formData.append('subject', 'Reserva');
    formData.append('content', correo);
    return this.http.post<any>(this.mailURL + "/enviar", formData);
  }
}
