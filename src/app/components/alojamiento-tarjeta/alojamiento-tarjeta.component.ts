import { Component, Input, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModel } from '../../../models/usuario.model';
import { Alojamiento, Foto } from '../../../models/alojamientos.model';
import { AlojamientosService } from '../../servicios/alojamientos.service';
import Swal from 'sweetalert2';
import { FotosService } from '../../servicios/fotos.service';
import { ExperienciasService } from '../../servicios/experiencias.service';
import { Experiencias } from 'src/models/experiencias.model';




@Component({
  selector: 'app-alojamiento-tarjeta',
  templateUrl: './alojamiento-tarjeta.component.html',
  styleUrls: ['./alojamiento-tarjeta.component.css']
})
export class AlojamientoTarjetaComponent implements OnInit {
  
  @Input() Alojamiento: any;
  @Input() habitaciones = 1;
  @Input() propietario: UsuarioModel;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  ruta: string;
  puntuacion: string;
  usuario: UsuarioModel;

  @Input() experiencia: boolean = false;
  constructor(private router: Router, config: NgbCarouselConfig, private _alojServ: AlojamientosService, private fotos: FotosService,private _expServ: ExperienciasService) {
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
        
  }
  
  verAlojamiento(){
    return this.router.navigate(['/alojamiento/', this.Alojamiento.id]);
  }

  verExperiencia(){
    return this.router.navigate(['/experiencia/', this.Alojamiento.id]);
  }

  abrirFormularioAlojamiento(alojamiento: Alojamiento){
    this.router.navigate(['/formulario-alojamiento/', alojamiento.id]);
  }
  abrirFormularioExperiencia(alojamiento: Alojamiento){
    this.router.navigate(['/formulario-experiencia/', alojamiento.id]);
  }

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
}
