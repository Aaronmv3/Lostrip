import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/models/usuario.model';
import { Reserva } from '../../models/alojamientos.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private userURL: string;
  private usuarios: UsuarioModel [] = [];
  private usuario: UsuarioModel;

  constructor(private http: HttpClient) { 
    this.userURL = 'http://localhost:8080/usuario';
  }
//Devuelve un array con todos los usuarios
  getUsuarios(){
    this.usuarios = [];

    return this.http.get(this.userURL);
  }
  //Devuelve un array con un usuario en concreto
  getUsuario(id: string){
    this.usuarios = [];
    this.http.get(this.userURL + "/" + id).subscribe((data: UsuarioModel) =>{
      this.usuario = {
          userID: data.userID,
          nombre:  data.nombre,
          apellidos:  data.apellidos,
          email:  data.email,
          nick:  data.nick,
          fechaNacimiento: data.fechaNacimiento,
          usuarioRol:  data.usuarioRol,
          telefono:  data.telefono,
          fotoPerfil:  data.fotoPerfil,
          nacionalidad: data.nacionalidad,
          genero: data.genero,
          reservas: data.reservas,
      }
      this.usuarios.push(this.usuario);
    });
   return this.usuarios;
  }
//Crea un usuario
  crearUsuario(usuario: UsuarioModel){
    return this.http.post(this.userURL, usuario);
  }
//Guarda una imagen de usuario
  guardarImagen(imagen: File, userid: string){
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    formData.append('id', userid);
    return this.http.post<any>(this.userURL + "/imagen", formData);
  }
//Actualiza un usuario
  actualizarUsuario(usuario: UsuarioModel){
    return this.http.put(this.userURL, usuario);
  }
//añade una reserva a un usuario
  anadirReserva(reserva: Reserva, userid: string){

    return this.http.post(this.userURL +"/"+ userid + "/reserva", reserva);
  }
//Borra la reserva de un usuario
  borrarReserva(reserva: string, userid: string){
    const formData = new FormData();
    formData.append('idAlojamiento', reserva);
    formData.append('idUsuario', userid);
    return this.http.post(this.userURL + "/reserva/borrar", formData);
  }
//Borra un usuario
  borrarUsuario(usuario: UsuarioModel){
    return this.http.post<any>(this.userURL + "/borrado", usuario);
  }
}
