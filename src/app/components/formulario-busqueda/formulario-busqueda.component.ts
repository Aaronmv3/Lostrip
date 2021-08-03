import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { busqueda } from 'src/models/busqueda.model';
import { BusquedaService} from '../../servicios/busqueda.service';

@Component({
  selector: 'app-formulario-busqueda',
  templateUrl: './formulario-busqueda.component.html',
  styleUrls: ['./formulario-busqueda.component.css']
})
export class FormularioBusquedaComponent implements OnInit {


  @Output() resultForm = new EventEmitter<busqueda>();
  //Variables
  //Variables locales
  public searchForm: FormGroup;
  public buscar: busqueda;
  public fecha = new Date();
  //Arrays
  provincias = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
    'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
    'Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
    
  constructor( private fb: FormBuilder, private route: Router, public busqueda: BusquedaService) {

    
  }
  ngOnInit(): void {
    this.searchForm = new FormGroup({
      busqueda: new FormControl(''),
      entrada: new FormControl(''),
      salida: new FormControl(''),
      numHabitaciones: new FormControl('1', Validators.required),
      numAdultos: new FormControl('2' , Validators.required),
      numNinos: new FormControl('0' ,Validators.required)
    })
    
  }
  //Envia el resultado de la busqueda a traves de los componentes para su utilizacion en otras paginas/componentes
  enviarBusqueda(){
    
     this.buscar = this.busqueda.crearBusqueda(this.searchForm.value.busqueda, this.searchForm.value.entrada, this.searchForm.value.salida, parseInt(this.searchForm.value.numHabitaciones),
     parseInt(this.searchForm.value.numAdultos), parseInt(this.searchForm.value.numNinos));
     
     if(this.route.url == "/home"){
      this.busqueda.pasarBusqueda = this.buscar;
     }else{
       this.resultForm.emit(this.buscar);
     }

     if(this.route.url == "/home" || this.route.url == "/alojamientos"){
       return this.route.navigate(["/alojamientos"]);
     }else{
       return this.route.navigate(["/experiencias"])
     }
    
   }

}
