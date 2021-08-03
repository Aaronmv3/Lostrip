import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {  BusquedaService } from 'src/app/servicios/busqueda.service';
import { busqueda } from 'src/models/busqueda.model';
import { Experiencias } from 'src/models/experiencias.model';
import {  ExperienciasService } from '../../servicios/experiencias.service';

@Component({
  selector: 'app-lista-experiencias',
  templateUrl: './lista-experiencias.component.html',
  styleUrls: ['./lista-experiencias.component.css']
})
export class ListaExperienciasComponent implements OnInit {

  //Filtros
  experiencias: Experiencias[] = [];
  busqueda: busqueda;
  guardarBusquedaExp: Experiencias[] = [];
  guardarPrimBusqueda: Experiencias[];
  //Booleanos
  primBusqueda: boolean = false;
  filtrado2: boolean = false;
  load: boolean = true;

  //Ordenado
  public shortByForm: FormGroup;
  ordenado: string[] = ['Precio Asc', 'Precio Desc', 'Nombre Asc', 'Nombre Desc'];
  ordenacion: string = "nombre";
  valor: string = "asc";

  //Paginacion
  page = 1;
  pageSize = 2;
  
 constructor( private _experienciaService: ExperienciasService,
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
      }); 
      this.experiencias = this._experienciaService.buscarExperiencia(this.busqueda.busqueda);
      this.guardarBusquedaExp = this.experiencias;

      setTimeout(() => {
        this.load = false;
      }, 1000);
  }

  ordenarAlojamientos(){
    this.ordenacion = this.shortByForm.value.shortBy.split(" ")[1].toLowerCase();
    this.valor = this.shortByForm.value.shortBy.split(" ")[0].toLowerCase(); 
  }

  obtenerBusqueda(objeto){
    this.busqueda = objeto;

    
    this.experiencias = this._experienciaService.buscarExperiencia(this.busqueda.busqueda);
    this.guardarBusquedaExp = this.experiencias;
  }

  AplicarFiltros(objeto){ 
  //   if(objeto.length == 1 && this.primBusqueda == false){
  //     this.guardarPrimBusqueda = this.guardarBusquedaAloj;
  //     this.primBusqueda = true;
  //   }else if(objeto.length > 1){
  //     this.guardarBusquedaAloj = this.alojamientos;
  //   }

  //   if(objeto.length == 0){
  //     this.guardarBusquedaAloj = this.guardarPrimBusqueda;
  //     this.primBusqueda = false;
  //   }
  //  this.alojamientos = this._alojamientosService.filtrarAlojamiento(objeto, this.alojamientos, this.guardarBusquedaAloj, this.filtrado2);

  //  if(objeto.length > 1){
  //   this.filtrado2 = true
  // }else{
  //   this.filtrado2 = false;
  // }

    
  }
}
