import { Component, Input, OnInit } from '@angular/core';
import { faEdit, faSave, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../../models/usuario.model';
import { UsuariosService } from '../../servicios/usuarios.service';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {

  usuarios: UsuarioModel[];
  @Input() usuarioActual: UsuarioModel;
  cargado: boolean = false;
  formularioRol: FormGroup;

  actualizarRol: boolean = false;

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faTimes = faTimes;
  faSave = faSave;
  constructor(private _userService: UsuariosService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuarios = this._userService.getUsuarios();
    setTimeout(() => {
      this.cargado = true;
      this.formularioRol = new FormGroup({
        rol: new FormControl('', Validators.required),
      });
    }, 500);
  }


  async borrarCuenta(){
    
    await Swal.fire({
    title: 'Seguro que quiere borrar esta cuenta?',
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
  actualizarRoles(i: number){
    var usuario = this.usuarios[i];
    usuario.usuarioRol = this.formularioRol.value.rol;  
    if (usuario.usuarioRol != "") {
      this._userService.actualizarUsuario(usuario).subscribe(()=>{
        window.location.reload();
      });
      
    }
  }
}
