import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FotosService } from 'src/app/servicios/fotos.service';
import { Filtro, Foto } from 'src/models/alojamientos.model';
import Swal from 'sweetalert2';
import { Experiencias } from '../../../models/experiencias.model';
import { ExperienciasService } from '../../servicios/experiencias.service';

@Component({
  selector: 'app-fomulario-experiencia',
  templateUrl: './fomulario-experiencia.component.html',
  styleUrls: ['./fomulario-experiencia.component.css']
})
export class FormularioExperienciaComponent implements OnInit {
  //Variables
    //Datos
    experienciaFormulario: FormGroup;
    provincias = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
    'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
    'Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
    fotosExperiencia: Foto[] = [];

    //Datos de back
    obtenerExp: Experiencias[];
    experiencia: Experiencias;
  
    //Iconos
    faUpload = faUpload;
    //Boolean
    mostrarFotosExperiencia = false;
    mostrar = false;
    //Chips
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    filtros : Filtro[] = [];
    filtrosValidosExperiencia: string[] = ['Jardin', 'Naturaleza', 'Playa', 'Tematico', 'Bosque', 'Atracciones'];
    @ViewChild('filtrosInput') filtrosInput: ElementRef<HTMLInputElement>;

    constructor(private _expServ: ExperienciasService, private cloud: FotosService, private router: Router, private routerAct : ActivatedRoute) { }

    ngOnInit(): void {
      Swal.showLoading();
      setTimeout(() => {
        setTimeout(() => {
          if (this.obtenerExp != undefined) {
            this.experiencia = this.obtenerExp[0];
                       
            this.experienciaFormulario = new FormGroup({
              nombreExp: new FormControl(this.experiencia.nombre, [Validators.required, Validators.maxLength(25), Validators.minLength(5)]),
              descripcionExp: new FormControl(this.experiencia.descripcion, [Validators.required, Validators.maxLength(200), Validators.minLength(20)]),
             estrellas: new FormControl(this.experiencia.estrellas, [Validators.required, Validators.max(5), Validators.min(1)]),
            localizacion: new FormControl(this.experiencia.localizacion, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
             oferta: new FormControl(this.experiencia.oferta, [Validators.required]),
             precio : new FormControl(this.experiencia.precio, [Validators.required, Validators.max(500), Validators.min(20)]),
           });

           this.fotosExperiencia = this.experiencia.fotos;
           this.mostrarFotosExperiencia = true;
           this.filtros = this.experiencia.filtros;
          }else{
            this.experienciaFormulario = new FormGroup({
              nombreExp: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(5)]),
              descripcionExp: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(20)]),
              estrellas: new FormControl('', [Validators.required, Validators.max(5), Validators.min(1)]),
              localizacion: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
              oferta: new FormControl(false, [Validators.required]),
              precio : new FormControl('', [Validators.required, Validators.max(500), Validators.min(20)]),
            });
          }
          this.mostrar = true;
          Swal.close();
          console.log(this.experiencia);
          
        }, 600);
        if(this.routerAct.firstChild != undefined){
        this.routerAct.firstChild.params.subscribe(params => {  
          if(params.id != undefined){        
            this.obtenerExp = this._expServ.getExperiencia(params.id);
            
          }
        });
      }
      }, 500);   
    }
//Introduce filtros en el array
    filtrado(e: MatAutocompleteSelectedEvent){
      this.filtros.push({filtros:e.option.viewValue});
      this.filtrosInput.nativeElement.value = '';
    }
//Elimina un filtro del array
    removeFiltro(filtro: Filtro): void {
      const index = this.filtros.indexOf(filtro);
      
      if (index >= 0) {
        this.filtros.splice(index, 1);
      }
    }
//Sube la experiencia a la base de datos
    guardarExperiencia(){
       this._expServ.crearExperiencia(this.experiencia).subscribe((data)=>{
           this.router.navigateByUrl('/perfil');
       });
   }
//Crea una experiencia
   crearExperiencia(){
    if (this.experiencia == undefined) {
      this.experiencia = {};
    }
    this.experiencia.nombre = this.experienciaFormulario.value.nombreExp;
    this.experiencia.descripcion = this.experienciaFormulario.value.descripcionExp;
    this.experiencia.dueno = sessionStorage.getItem("Logged");
    this.experiencia.estrellas = this.experienciaFormulario.value.estrellas;
    this.experiencia.fotos = this.fotosExperiencia;
    this.experiencia.filtros = this.filtros;
    this.experiencia.oferta = this.experienciaFormulario.value.oferta;
    this.experiencia.localizacion = this.experienciaFormulario.value.localizacion;
  }

//Sube al servidor las fotos seleccionadas
  subirFotoExperiencia(){
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    fileUpload.onchange = () =>{
      for(let i = 0; i < fileUpload.files.length; i++){
        this.cloud.subir(fileUpload.files[i]).subscribe(data =>{
          this.fotosExperiencia.push({
            url: data.url,
            imagenId: data.public_id
          })
        }); 
        
      }
      this.mostrarFotosExperiencia = true;
    }

    fileUpload.click();
  }
  //Elimina la foto seleccionada
  borrarFotoExperiencia(foto: Foto){
    var index = this.fotosExperiencia.indexOf(foto);
    if (index >= 0) {
      this.fotosExperiencia.splice(index, 1);
    }
    this.cloud.borrar(foto.imagenId).subscribe();
  }

  //Getters para las validaciones del formulario
  get nombreExp(){return this.experienciaFormulario.get('nombreExp');}
  get descripcionExp(){return this.experienciaFormulario.get('descripcionExp');}
  get estrellas(){return this.experienciaFormulario.get('estrellas');}
  get localizacion(){return this.experienciaFormulario.get('localizacion');}
  get oferta(){return this.experienciaFormulario.get('oferta');}
  get precio(){return this.experienciaFormulario.get('precio');}
}
