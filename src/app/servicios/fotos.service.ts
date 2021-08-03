import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  private fotosURL: string;
  constructor(private http: HttpClient) { 
    this.fotosURL = 'http://localhost:8080/cloudinary';
  }
//Sube una imagen al servidor de imagenes
  subir(imagen: File){
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.http.post<any>(this.fotosURL + "/upload", formData);
  }
  //Borra una imagen de un servidor de imagenes
  borrar(id: string){
    return this.http.delete(this.fotosURL + "/delete/" + id);
  }
}
