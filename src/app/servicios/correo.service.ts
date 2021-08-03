import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../../models/alojamientos.model';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  private mailURL: string;
  constructor(private http: HttpClient) { 
    this.mailURL = 'http://localhost:8080/correo';
  }
//Envia un correo de confirmacion de una reserva
  enviar(para: string, alojamientoNombre: string, usuarioNombre:string, reserva: Reserva){
    const formData = new FormData();
    var correo: string = "Le confirmamos su solicitud de reserva a nombre de " + usuarioNombre + " para el alojamiento: " +
    alojamientoNombre + ".\nLas fechas seleccionadas son del " + reserva.fechaEntrada + " hasta el " + reserva.fechaSalida + ".\nNumero de personas: " +
    reserva.personas + ".\nEsperamos que disfrute de su estancia!";

    formData.append('to', para);
    formData.append('subject', 'Reserva');
    formData.append('content', correo);
    return this.http.post<any>(this.mailURL + "/enviar", formData);
  }
  //Envia un correo de cancelacion de una reserva
  enviarCancelacion(para: string, alojamientoNombre: string, usuarioNombre:string){
    const formData = new FormData();
    var correo: string = "Hola " + usuarioNombre + "!\nLe informamos que su reserva para el alojamiento " +
    alojamientoNombre + " ha sido cancelada.\nLe deseamos un buen dia!"

    formData.append('to', para);
    formData.append('subject', 'Reserva');
    formData.append('content', correo);
    return this.http.post<any>(this.mailURL + "/enviar", formData);
  }
}
