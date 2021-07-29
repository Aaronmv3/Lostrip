import { Injectable } from '@angular/core';
import { Alojamiento } from 'src/models/alojamientos.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable()

export class AlojamientosService {
  
  private alojamientos: Alojamiento[] = [];
  private alojURL = environment.alojURL;
  private alojamiento: Alojamiento;

  constructor(private http: HttpClient) { 
  }

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

  buscarAlojamiento( busqueda: string){
    if(busqueda == "Total"){

      return this.getAlojamientos();
    }else{
        let busquedaAlojamiento: Alojamiento[] = [];

        busquedaAlojamiento = this.alojamientos.filter(alojamiento => alojamiento.localizacion == busqueda);

        return busquedaAlojamiento;
      }
    }

  crearAlojamiento(alojamiento: Alojamiento){
    return this.http.post<any>(this.alojURL, alojamiento);
  }

  deleteAlojamiento(alojamiento: Alojamiento){
    return this.http.post<any>(this.alojURL + "/borrar", alojamiento);
  }
}
