import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {  Router } from '@angular/router';
import {  AlojamientosService } from 'src/app/servicios/alojamientos.service';
import { Alojamiento } from 'src/models/alojamientos.model';
import { busqueda } from 'src/models/busqueda.model';
import { BusquedaService } from '../../servicios/busqueda.service';
import { Filtro } from '../../../models/alojamientos.model';

@Component({
  selector: 'app-lista-alojamientos',
  templateUrl: './lista-alojamientos.component.html',
  styleUrls: ['./lista-alojamientos.component.css']
})
export class ListaAlojamientosComponent implements OnInit {
  
  load: boolean = true;
  //Filtros
  alojamientos: Alojamiento[] = [];
  alojamientosBusqueda: Alojamiento[] = [];
  busqueda: busqueda;
  

  //Ordenado
  public shortByForm: FormGroup;
  ordenado: string[] = ['Nombre Asc', 'Nombre Desc'];
  ordenacion: string = "nombre";
  valor: string = "asc";

  //Paginacion
  page = 1;
  pageSize = 2;
  
 constructor( private _alojamientosService: AlojamientosService,
    private router: Router, private _busquedaService: BusquedaService, private fb: FormBuilder) {
      this.busqueda ={
        busqueda: "Total",
        entrada: new Date(),
        salida: new Date(),
        numHabitaciones: 1,
        numAdultos: 0,
        numNinos: 0
      }
    }
  
  
  ngOnInit(): void {
    this.shortByForm = this.fb.group({
      shortBy: new FormControl('')
  }) 
    
    if(this._busquedaService.pasarBusqueda == undefined){
      this.alojamientos = this._alojamientosService.buscarAlojamiento(this.busqueda.busqueda);
    }else{
      this.busqueda = this._busquedaService.pasarBusqueda;
      this.alojamientos = this._alojamientosService.buscarAlojamiento(this.busqueda.busqueda);
    }

    setTimeout(() => {
      this.load = false;
      this.alojamientosBusqueda = this.alojamientos;
    }, 2000);
    
  }

  ordenarAlojamientos(){
    this.ordenacion = this.shortByForm.value.shortBy.split(" ")[1].toLowerCase();
    this.valor = this.shortByForm.value.shortBy.split(" ")[0].toLowerCase(); 
  }

  obtenerBusqueda(objeto){
    if(objeto != undefined){
      this.busqueda = objeto;
    }
    this.alojamientos = this._alojamientosService.buscarAlojamiento(this.busqueda.busqueda);
    this.alojamientosBusqueda = this.alojamientos;
  }

  filtrar(filtros: string[]){
    var alojamientosFiltrados: Alojamiento[] = [];
    if(filtros.length == 0){
      this.alojamientos = this.alojamientosBusqueda;
    }else{
        alojamientosFiltrados = this.alojamientosBusqueda;

          for(let i in filtros){
            alojamientosFiltrados = alojamientosFiltrados.filter(alojamiento =>{  
                return alojamiento.filtros.find(filtro => filtro.filtros == filtros[i]);
              });
          }
          this.alojamientos = alojamientosFiltrados; 
    }
  }
}
