import { Injectable } from '@angular/core';
import { Alojamiento } from 'src/models/alojamientos.model';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AlojamientosService {
  
  private alojamientos: Alojamiento[] = [];
  private alojURL: string;
  private alojamiento: Alojamiento;

  constructor(private http: HttpClient) { 
    this.alojURL = 'http://localhost:8080/alojamiento';
  }

//Devuelve un array con todos los alojamientos que hay en la base de datos
  getAlojamientos(){

    this.alojamientos = [];
    this.http.get<Alojamiento>(this.alojURL).subscribe(data =>{
      for(let i = 0; i< Object.keys(data).length; i++){
      
        this.alojamiento = {
          nombre : data[i].nombre,
          descripcion : data[i].descripcion,
          dueno : data[i].dueno,
          estrellas : data[i].estrellas,
          fotos : data[i].fotos,
          id : data[i].id,
          localizacion : data[i].localizacion,
          oferta : data[i].oferta,
          filtros : data[i].filtros,
          valoracion : data[i].valoracion,
          comentarios: data[i].comentarios,
          habitaciones:  data[i].habitaciones
        }
        
        this.alojamientos.push(this.alojamiento);        
      }
    });
    return this.alojamientos;
    
  }

  //Devuelve un array con un alojamiento en concreto
  getAlojamiento(id: string){
    this.alojamientos = [];
    this.http.get<Alojamiento>(this.alojURL + "/" + id).subscribe(data =>{
      this.alojamiento = {
        nombre : data.nombre,
        descripcion : data.descripcion,
        dueno : data.dueno,
        estrellas : data.estrellas,
        fotos : data.fotos,
        id : data.id,
        localizacion : data.localizacion,
        oferta : data.oferta,
        filtros : data.filtros,
        valoracion : data.valoracion,
        comentarios: data.comentarios,
        habitaciones:  data.habitaciones
      }
      
      this.alojamientos.push(this.alojamiento);
    });

    return this.alojamientos;
   
  }
//Sistema de busqueda para filtrar alojamientos
  buscarAlojamiento( busqueda: string){
    if(busqueda == "Total"){

      return this.getAlojamientos();
    }else{
        let busquedaAlojamiento: Alojamiento[] = [];

        busquedaAlojamiento = this.alojamientos.filter(alojamiento => alojamiento.localizacion == busqueda);

        return busquedaAlojamiento;
      }
    }
//Crea un alojamiento en la base de datos
  crearAlojamiento(alojamiento: Alojamiento){
    return this.http.post<any>(this.alojURL, alojamiento);
  }
//Borra un alojamiento de la base de datos
  deleteAlojamiento(alojamiento: Alojamiento){
    return this.http.post<any>(this.alojURL + "/borrar", alojamiento);
  }
}
