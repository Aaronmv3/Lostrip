import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AlojamientosService } from '../../servicios/alojamientos.service';
import { Filtro, Foto } from '../../../models/alojamientos.model';
import { Caracteristica, Habitacion } from '../../../models/habitaciones.model';
import { FotosService } from '../../servicios/fotos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alojamiento } from 'src/models/alojamientos.model';
import Swal from 'sweetalert2';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-formulario-alojamiento',
  templateUrl: './formulario-alojamiento.component.html',
  styleUrls: ['./formulario-alojamiento.component.css']
})
export class FormularioAlojamientoComponent implements OnInit {

  //Variables
  //Datos
  AlojamientoFormulario: FormGroup;
  HabitacionFormulario: FormGroup;
  provincias = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
  fotosAlojamiento: Foto[] = [];
  fotosHabitacion: Foto[] = [];
  habitaciones: Habitacion[] = [];
  //Datos de back
  obtenerAloj: Alojamiento[];
  alojamiento: Alojamiento;

  //Iconos
  faUpload = faUpload;
  //Boolean
  mostrarHabitaciones = false;
  mostrarFotosAlojamiento = false;
  mostrarFotosHabitacion = false;
  mostrar = false;
  //Chips
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  filtros : Filtro[] = [];
  filtrosValidosAlojamiento: string[] = ['Playa', 'Montaña', 'Ciudad', 'Piscina', 'Centro', 'Wifi', 'Admite mascotas', 'Fumadores'];
  caracteristicas: Caracteristica[] = [];

   @ViewChild('filtrosInput') filtrosInput: ElementRef<HTMLInputElement>;
  constructor(private _alojServ: AlojamientosService, private cloud: FotosService, private router: Router, private routerAct : ActivatedRoute) { }

  ngOnInit(): void {
    Swal.showLoading();
    setTimeout(() => {
      setTimeout(() => {
        if (this.obtenerAloj != undefined) {
          this.alojamiento = this.obtenerAloj[0];
          
          this.AlojamientoFormulario = new FormGroup({
            nombreAloj: new FormControl(this.alojamiento.nombre, [Validators.required, Validators.maxLength(25), Validators.minLength(5)]),
           descripcionAloj: new FormControl(this.alojamiento.descripcion, [Validators.required, Validators.maxLength(200), Validators.minLength(20)]),
           estrellas: new FormControl(this.alojamiento.estrellas, [Validators.required, Validators.max(5), Validators.min(1)]),
            localizacion: new FormControl(this.alojamiento.localizacion, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
           oferta: new FormControl(this.alojamiento.oferta, [Validators.required]),
         });
         this.habitaciones = this.alojamiento.habitaciones;
         this.fotosAlojamiento = this.alojamiento.fotos;
         this.mostrarFotosAlojamiento = true;
         this.mostrarHabitaciones = true;
         this.filtros = this.alojamiento.filtros;
        }else{
          this.AlojamientoFormulario = new FormGroup({
            nombreAloj: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(5)]),
            descripcionAloj: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(20)]),
            estrellas: new FormControl('', [Validators.required, Validators.max(5), Validators.min(1)]),
            localizacion: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
            oferta: new FormControl(false, [Validators.required]),
          });
        }
        this.mostrar = true;
        Swal.close();
      }, 600);
      if(this.routerAct.firstChild != undefined){
      this.routerAct.firstChild.params.subscribe(params => {  
        if(params.id != undefined){        
          this.obtenerAloj = this._alojServ.getAlojamiento(params.id);
        }
      });
    }
    }, 500);
      this.HabitacionFormulario = new FormGroup({
        nombreHab: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(5)]),
        precio : new FormControl('', [Validators.required, Validators.max(500), Validators.min(20)]),
        capacidad : new FormControl('', [Validators.required, Validators.max(8), Validators.min(1)]),
      });
    
    
  }
  filtrado(e: MatAutocompleteSelectedEvent){
    this.filtros.push({filtros:e.option.viewValue});
    this.filtrosInput.nativeElement.value = '';
  }


  addCaracteristica(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.caracteristicas.push({caracteristica: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removeFiltro(filtro: Filtro): void {
    const index = this.filtros.indexOf(filtro);
    
    if (index >= 0) {
      this.filtros.splice(index, 1);
    }
  }
  removeCaracteristica(caracteristica: Caracteristica): void {
    const index = this.caracteristicas.indexOf(caracteristica);
    
    if (index >= 0) {
      this.caracteristicas.splice(index, 1);
    }
  }

  guardarAlojamiento(){
    console.log(this.alojamiento);
    
    //  this._alojServ.crearAlojamiento(this.alojamiento).subscribe((data)=>{
    //    console.log(data);
    //      this.router.navigateByUrl('/perfil');
    //  });

  }
  crearAlojamiento(){
    if (this.alojamiento == undefined) {
      this.alojamiento = {};
    }
    this.alojamiento.nombre = this.AlojamientoFormulario.value.nombreAloj;
    this.alojamiento.dueno = sessionStorage.getItem("Logged");
    this.alojamiento.descripcion = this.AlojamientoFormulario.value.descripcionAloj;
    this.alojamiento.estrellas = this.AlojamientoFormulario.value.estrellas;
    this.alojamiento.fotos = this.fotosAlojamiento;
    this.alojamiento.filtros = this.filtros;
    this.alojamiento.oferta = this.AlojamientoFormulario.value.oferta;
    this.alojamiento.localizacion = this.AlojamientoFormulario.value.localizacion;
    this.alojamiento.habitaciones = this.habitaciones;
  }

  anadirHabitacion(){
    this.habitaciones.push({
      nombreHab: this.HabitacionFormulario.value.nombreHab,
      precio: this.HabitacionFormulario.value.precio,
      capacidad: this.HabitacionFormulario.value.capacidad,
      fotosHab: this.fotosHabitacion,
      caracteristicas: this.caracteristicas
    });
    console.log(this.habitaciones);
    
    this.mostrarHabitaciones = true;
    
    this.caracteristicas = [];
    this.fotosHabitacion = [];
  }

  subirFotoAlojamiento(){
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    fileUpload.onchange = () =>{
      for(let i = 0; i < fileUpload.files.length; i++){
        this.cloud.subir(fileUpload.files[i]).subscribe(data =>{
          this.fotosAlojamiento.push({
            url: data.url,
            imagenId: data.public_id
          })
        }); 
        
      }
      this.mostrarFotosAlojamiento = true;
    }

    fileUpload.click();
  }
  subirFotoHabitacion(e){
    const fileUpload = document.getElementById('fileUploadH') as HTMLInputElement;

    fileUpload.onchange = () =>{
      for(let i = 0; i < fileUpload.files.length; i++){
        this.cloud.subir(fileUpload.files[i]).subscribe(data =>{
          this.fotosHabitacion.push({
            url: data.url,
            imagenId: data.public_id
          })
        }); 
        
      }
      this.mostrarFotosHabitacion = true;
    }

    fileUpload.click();
  }

  borrarFotoAlojamiento(foto: Foto){
    var index = this.fotosAlojamiento.indexOf(foto);
    if (index >= 0) {
      this.fotosAlojamiento.splice(index, 1);
    }
    this.cloud.borrar(foto.imagenId).subscribe();
  }

  borrarFotoHabitacion(foto: Foto){
    var index = this.fotosHabitacion.indexOf(foto);
    if (index >= 0) {
      this.fotosHabitacion.splice(index, 1);
    }
    this.cloud.borrar(foto.imagenId).subscribe();
  }

  borrarHabitacion(habitacion: Habitacion){
      var index = this.habitaciones.indexOf(habitacion);
      if(index >= 0){
        this.habitaciones.splice(index, 1);
      }
      if (this.habitaciones.length == 0) {
        this.mostrarHabitaciones = false;
      }
  }


  get nombreAloj(){return this.AlojamientoFormulario.get('nombreAloj');}
  get descripcionAloj(){return this.AlojamientoFormulario.get('descripcionAloj');}
  get estrellas(){return this.AlojamientoFormulario.get('estrellas');}
  get localizacion(){return this.AlojamientoFormulario.get('localizacion');}
  get oferta(){return this.AlojamientoFormulario.get('oferta');}

  get nombreHab(){return this.HabitacionFormulario.get('nombreHab');}
  get precio(){return this.HabitacionFormulario.get('precio');}
  get capacidad(){return this.HabitacionFormulario.get('capacidad');}
}
