//Importaciones
import { Component, Input, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModel } from '../../../models/usuario.model';
import { Alojamiento, Foto, Reserva } from '../../../models/alojamientos.model';
import { AlojamientosService } from '../../servicios/alojamientos.service';
import Swal from 'sweetalert2';
import { FotosService } from '../../servicios/fotos.service';
import { ExperienciasService } from '../../servicios/experiencias.service';
import { busqueda } from '../../../models/busqueda.model';
import { BusquedaService } from 'src/app/servicios/busqueda.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { CorreoService } from '../../servicios/correo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { comentario } from '../../../models/comentarios.model';
@Component({
  selector: 'app-alojamiento-tarjeta',
  templateUrl: './alojamiento-tarjeta.component.html',
  styleUrls: ['./alojamiento-tarjeta.component.css']
})
export class AlojamientoTarjetaComponent implements OnInit {
  //Variables
    //Inputs
    @Input() Alojamiento: any;
    @Input() habitaciones = 1;
    @Input() propietario: UsuarioModel;
    @Input() busqueda: busqueda;
    //Iconos
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;
    //Variables locales
    reserva: Reserva;
    ruta: string;
    puntuacion: string;
    usuario: UsuarioModel;
    comentarioForm: FormGroup;
    //booleanos
    comentarioMostrar: boolean = false;

  constructor(private router: Router, config: NgbCarouselConfig, private _alojServ: AlojamientosService, private fotos: FotosService,
    private _expServ: ExperienciasService, private busquedaServ: BusquedaService, private userServ: UsuariosService, private correo: CorreoService) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
    config.showNavigationArrows = false;
   }

  ngOnInit(): void {
        this.ruta = this.router.url;
        if(this.Alojamiento.valoracion >= 0 && this.Alojamiento.valoracion < 6){
          this.puntuacion = "Normal"
        } else if(this.Alojamiento.valoracion >= 6 && this.Alojamiento.valoracion < 8){
          this.puntuacion = "Bien"
        }else if(this.Alojamiento.valoracion >= 8 && this.Alojamiento.valoracion < 9){
          this.puntuacion = "Fantastico"
        }else if(this.Alojamiento.valoracion >= 9 && this.Alojamiento.valoracion <= 10){
          this.puntuacion = "Increible"
        }
    if (this.ruta == "/perfil") {
      if (this.Alojamiento.dueno != this.propietario.userID) {
        this.Alojamiento = null;
      } 
    }
    if(this.ruta == '/reservas'){
      this.propietario.reservas.forEach(reserva =>{
        if(reserva.alojamientoId == this.Alojamiento.id){
          this.reserva = reserva;
        }
      })
    } 
    this.comentarioForm = new FormGroup({
      comentario: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(25)]),
      valoracion: new FormControl(1),
    });
  }

  //Te redirige al alojamiento correspondiente
  verAlojamiento(){
    
    this.busquedaServ.pasarBusqueda = this.busqueda;
    return this.router.navigate(['/alojamiento/', this.Alojamiento.id]);
  }

  //Te redirige a la experiencia correspondiente
  verExperiencia(){
    return this.router.navigate(['/experiencia/', this.Alojamiento.id]);
  }

  //Te redirige al formulario para editar este alojamiento
  abrirFormularioAlojamiento(alojamiento: Alojamiento){
    this.router.navigate(['/formulario-alojamiento/', alojamiento.id]);
  }

  //Te redirige al formulario para editar esta experiencia
  abrirFormularioExperiencia(alojamiento: Alojamiento){
    this.router.navigate(['/formulario-experiencia/', alojamiento.id]);
  }

  //Borra el alojamiento seleccionado
  borrarAlojamiento(alojamiento: Alojamiento){
    Swal.showLoading();
    alojamiento.fotos.forEach(foto =>{
      this.fotos.borrar(foto.imagenId);
    });
    alojamiento.habitaciones.forEach(habitacion =>{
      habitacion.fotosHab.forEach(foto =>{
        this.fotos.borrar(foto.imagenId);
      })
    })

    this._alojServ.deleteAlojamiento(alojamiento).subscribe((data)=>{
     
      console.log(data);
    });
    Swal.close();
    window.location.reload();
  }
  
  //Borra la experiencia seleccionado
  borrarExperiencia(alojamiento: Alojamiento){
    Swal.showLoading();
    alojamiento.fotos.forEach(foto =>{
      this.fotos.borrar(foto.imagenId);
    });

    this._expServ.borrarExperiencia(alojamiento).subscribe((data)=>{
     
      console.log(data);
    });
    Swal.close();
    window.location.reload();
  }

  //Guarda el comentario escrito en el formulario en su respectivo alojamiento/experiencia
  guardarComentario(){
    let valoracionTotal: number = 0;
    let comentario: comentario = {
      comentario: this.comentarioForm.value.comentario,
      userID: sessionStorage.getItem("Logged"),
      valoracion: this.comentarioForm.value.valoracion
    }
    this.Alojamiento.comentarios.push(comentario);
    this.Alojamiento.comentarios.forEach(comentario => {
      valoracionTotal+= comentario.valoracion;
    });
    console.log(valoracionTotal);
    console.log(this.Alojamiento.comentarios.length);
    
    valoracionTotal = valoracionTotal/this.Alojamiento.comentarios.length;

    console.log(valoracionTotal);
    
    this.Alojamiento.valoracion = valoracionTotal;

    this._alojServ.crearAlojamiento(this.Alojamiento).subscribe(() =>{
      this.comentarioMostrar = false;
      window.location.reload;
    });
    
  }

  //Muestra una ventana modal y cancela la reserva si lo confirmas
  async cancelarReserva(reserva: Reserva){
    await Swal.fire({
      title: 'Seguro que quiere cancelar su reserva?',
      text: 'Esta accion será irreversible',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      confirmButtonColor: '#FF2D00',
    }).then(result =>{
      if(result.isConfirmed){
        Swal.showLoading();
        let index = this.propietario.reservas.indexOf(reserva);
        if (index >= 0) {
          this.propietario.reservas.splice(index, 1);
        }
        
        this.userServ.actualizarUsuario(this.propietario).subscribe(()=>{
          this.correo.enviarCancelacion(this.propietario.email, this.Alojamiento.nombre, this.propietario.nombre).subscribe(()=>{
            Swal.close();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Se ha cancelado la reserva correctamente',
                  showConfirmButton: false,
                  timer: 1500
                }).then(()=> window.location.reload());
          });
        });
        
      }
    });
    
  }

  //gets para las validaciones del formulario
  get comentario(){return this.comentarioForm.get('comentario');}
}
