import { Injectable } from '@angular/core';
import { Experiencias } from 'src/models/experiencias.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperienciasService {
  
  private  experiencias: Experiencias[] = [];
  private expURL: string;
  private experiencia: Experiencias;

  constructor(private http: HttpClient) {
    this.expURL = 'http://localhost:8080/experiencia'
   }
//Devuelve un array con todas las experiencias
  getExperiencias(){
    this.experiencias = [];
    this.http.get(this.expURL).subscribe(data =>{    
      for(let i = 0; i < Object.keys(data).length; i++){

        this.experiencia = {
          nombre : data[i].nombre,
          descripcion : data[i].descripcion,
          precio : data[i].precio,
          estrellas : data[i].estrellas,
          fotos : data[i].fotos,
          id : data[i].id,
          localizacion : data[i].localizacion,
          oferta : data[i].oferta,
          filtros : data[i].filtros,
          valoracion : data[i].valoracion,
          comentarios: data[i].comentarios,
          dueno: data[i].dueno,
        }

        this.experiencias.push(this.experiencia);
      }
    });
    return this.experiencias;

  }
  //Devuelve un array con una experiencia en concreto
  getExperiencia(id: string){
    this.experiencias = [];
    this.http.get<Experiencias>(this.expURL + "/" + id).subscribe(data =>{    
        this.experiencia = {
          nombre : data.nombre,
          descripcion : data.descripcion,
          precio : data.precio,
          estrellas : data.estrellas,
          fotos : data.fotos,
          id : data.id,
          localizacion : data.localizacion,
          oferta : data.oferta,
          filtros : data.filtros,
          valoracion : data.valoracion,
          comentarios: data.comentarios,
          dueno: data.dueno,
        }
        this.experiencias.push(this.experiencia);
    });
    return this.experiencias;
  }
//Obtiene el resultado de una busqueda
  buscarExperiencia( busqueda: string){
    if(busqueda == "Total"){
      return this.getExperiencias();
    }else{
        let busquedaExperiencia: Experiencias[] = [];

        busquedaExperiencia = this.experiencias.filter(experiencia => experiencia.localizacion == busqueda);

        return busquedaExperiencia;
      }
    }
//Crea una experiencia
    crearExperiencia(experiencia: Experiencias){
      return this.http.post<any>(this.expURL, experiencia);
    }
//Borra una experiencia
    borrarExperiencia(experiencia: Experiencias){
      return this.http.post<any>(this.expURL + "/borrar", experiencia);
    }

}