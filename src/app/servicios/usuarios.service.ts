import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/models/usuario.model';

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

  getUsuarios(){
    this.usuarios = [];

    this.http.get(this.userURL).subscribe(data =>{
      for(let i = 0; Object.keys(data).length; i++){
        this.usuario = {
          userID: data[i].userID,
          nombre:  data[i].nombre,
          apellidos:  data[i].apellidos,
          email:  data[i].email,
          nick:  data[i].nick,
          fechaNacimiento: data[i].fechaNacimiento,
          usuarioRol:  data[i].usuarioRol,
          telefono:  data[i].telefono,
          fotoPerfil:  data[i].fotoPerfil,
          reservas: data[i].reservas,
        }
        this.usuarios.push(this.usuario);
      }
    });
    return this.usuarios;
  }
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

  crearUsuario(usuario: UsuarioModel){
    return this.http.post(this.userURL, usuario);
  }

  guardarImagen(imagen: File, userid: string){
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    formData.append('id', userid);
    return this.http.post<any>(this.userURL + "/imagen", formData);
  }

  actualizarUsuario(usuario: UsuarioModel){
    return this.http.put(this.userURL, usuario);
  }

  anadirReserva(reserva: string, userid: string){
    const formData = new FormData();
    formData.append('idAlojamiento', reserva);
    formData.append('idUsuario', userid);
    return this.http.post(this.userURL + "/reserva", formData);
  }

  borrarReserva(reserva: string, userid: string){
    const formData = new FormData();
    formData.append('idAlojamiento', reserva);
    formData.append('idUsuario', userid);
    return this.http.post(this.userURL + "/reserva/borrar", formData);
  }

  borrarUsuario(usuario: UsuarioModel){
    return this.http.post<any>(this.userURL + "/borrado", usuario);
  }
}
