import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { UsuarioModel } from 'src/models/usuario.model';
import Swal from 'sweetalert2';
import {faCheck, faEdit, faCalendarAlt, faTimes, faSave, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../servicios/auth.service';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, OperatorFunction } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Alojamiento } from '../../../models/alojamientos.model';
import { AlojamientosService } from '../../servicios/alojamientos.service';
import { Experiencias } from 'src/models/experiencias.model';
import { ExperienciasService } from '../../servicios/experiencias.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  //Array con los paises
  paises: string[] = ["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán"
  ,"Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina",
  "Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar",
  "Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil",
  "Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia",
  "Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia",
  "Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall",
  "Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano",
  "Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania",
  "México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda",
  "Omán","Países Bajos","Pakistán","Palaos","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa",
  "República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia",
  "Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona",
  "Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo",
  "Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia"
  ,"Zimbabue"];

  //Variables
  usuario : UsuarioModel;
  obteneruser: UsuarioModel[];
  cargado: boolean = false;
  userFire: any;
  formularioActualizar: FormGroup;
  alojamientos: Alojamiento[];
  experiencias: Experiencias[];
  
  //Tipo de usuario
  admin: boolean = false;
  normal: boolean = false;
  propietario: boolean = false;

  //Apertura de edicion
  abrirNombre: boolean = false;
  abrirNick: boolean = false;
  abrirTelefono: boolean = false;
  abrirFecha: boolean = false;
  abrirNacionalidad: boolean = false;
  abrirGenero: boolean = false;

  // iconos
  faEdit = faEdit;
  faCheck = faCheck;
  faCalendarAlt = faCalendarAlt;
  faTimes = faTimes;
  faSave = faSave;
  faPlus = faPlusCircle;

  constructor(private _userService: UsuariosService, private auth:AuthService, private router: Router, private alojServ: AlojamientosService,
    private _expServ: ExperienciasService) { }

  ngOnInit(): void {
    Swal.showLoading();
    setTimeout(() => {
      setTimeout(() => {
        this.usuario = this.obteneruser[0];
        if (this.usuario.usuarioRol == "ADMIN") {
          this.admin = true;
        }else if(this.usuario.usuarioRol == "PROPIETARIO"){
          this.propietario = true;
        }else{
          this.normal = true;
        }
        this.formularioActualizar = new FormGroup({
          nombre : new FormControl(this.usuario.nombre, [Validators.required, Validators.maxLength(14), Validators.minLength(3)]),
          apellidos : new FormControl(this.usuario.apellidos, [Validators.required, Validators.maxLength(25), Validators.minLength(7)]),
          nick : new FormControl(this.usuario.nick, [Validators.required, Validators.maxLength(10), Validators.minLength(4)]),
          prefijo : new FormControl('', [Validators.required]),
          telefono: new FormControl(this.usuario.telefono, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
          fecha: new FormControl(this.usuario.fechaNacimiento, Validators.required),
          nacionalidad : new FormControl(this.usuario.nacionalidad, [Validators.required]),
          genero: new FormControl(this.usuario.genero, Validators.required),
        });
        Swal.close();
        this.cargado = true;
      }, 700);
      this.obteneruser = this._userService.getUsuario(sessionStorage.getItem("Logged"));
      this.userFire = this.auth.obtenerUsuario();
      this.alojamientos = this.alojServ.getAlojamientos();
      this.experiencias = this._expServ.getExperiencias();
    }, 600);
  }
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.paises.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  async subirImagen(){
    const { value: file } = await Swal.fire({
      title: 'Selecciona imagen de perfil',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })
    if (file) {
      this._userService.guardarImagen(file, this.usuario.userID).subscribe((data)=>{
      });
      this.actualizarFoto(file.name);
    }
  }

  actualizarFoto(imagen){
    this.usuario.fotoPerfil = "/assets/Imagenes/usuarios/" + this.usuario.userID + imagen;
    this._userService.actualizarUsuario(this.usuario).subscribe((data)=>{
      console.log(data);   
    });
  }
  actualizarUser(actualizar){
    switch (actualizar) {
      case "nombre":
          this.usuario.nombre = this.formularioActualizar.value.nombre;
          this.usuario.apellidos = this.formularioActualizar.value.apellidos;
        break;
      case "nick":
          this.usuario.nick = this.formularioActualizar.value.nick;
          this.abrirNick = false;
        break;
      case "telefono":
          this.usuario.telefono = this.formularioActualizar.value.telefono;
          this.abrirTelefono = false;
        break;
      case "fecha":
          var fecha = this.formularioActualizar.value.fecha.day + "/" + this.formularioActualizar.value.fecha.month + "/" + this.formularioActualizar.value.fecha.year;
          this.usuario.fechaNacimiento = fecha;
          this.abrirFecha = false;
        break;
      case "nacionalidad":
          this.usuario.nacionalidad = this.formularioActualizar.value.nacionalidad;
          this.abrirNacionalidad = false;
        break;
      case "genero":
          this.usuario.genero = this.formularioActualizar.value.genero;
          this.abrirGenero = false;
        break;
    }
    this._userService.actualizarUsuario(this.usuario).subscribe((data)=>{
      console.log(data);        
    });
    window.location.reload();
  }

  async contrasenaRec(){
    
    await Swal.fire({
    title: 'Quieres restablecer tu contraseña?',
    text: 'Se enviará un correo de resteo a ' + this.usuario.email,
    showCancelButton: true,
    confirmButtonText: 'Enviar',
  }).then(result =>{
    if(result.isConfirmed){
      this.auth.reseteoContrasena(this.usuario.email);
    }
  });
  }

  async borrarCuenta(){
    
    await Swal.fire({
    title: 'Seguro que quiere borrar su cuenta?',
    text: 'Esta accion será irreversible',
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    confirmButtonColor: '#FF2D00',
  }).then(result =>{
    if(result.isConfirmed){
      Swal.showLoading();
      this.auth.borrarUsuario().then(()=>{
        Swal.close();
        window.location.reload();
      });
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 150);
      
    }
  });
  }

  abrirFormulario(tipo: String){
    if(tipo == "alojamiento"){
      this.router.navigateByUrl('/formulario-alojamiento');
    }else if(tipo == "experiencia"){
      this.router.navigateByUrl('/formulario-experiencia');
    }
  }

  //gets para formularios
  get nombre(){return this.formularioActualizar.get('nombre');}
  get apellidos(){return this.formularioActualizar.get('apellidos');}
  get nick(){return this.formularioActualizar.get('nick');}
  get prefijo(){return this.formularioActualizar.get('prefijo');}
  get telefono(){return this.formularioActualizar.get('telefono');}
  get fecha(){return this.formularioActualizar.get('fecha');}
  get nacionalidad(){return this.formularioActualizar.get('nacionalidad');}
  get genero(){return this.formularioActualizar.get('genero');}
}
