import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  private mailURL: string;
  constructor(private http: HttpClient) { 
    this.mailURL = 'http://localhost:8080/correo';
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
