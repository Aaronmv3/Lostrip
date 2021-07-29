import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  private fotosURL = environment.fotosURL;
  constructor(private http: HttpClient) { 

  }

  subir(imagen: File){
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.http.post<any>(this.fotosURL + "/upload", formData);
  }
  borrar(id: string){
    return this.http.delete(this.fotosURL + "/delete/" + id);
  }
}
