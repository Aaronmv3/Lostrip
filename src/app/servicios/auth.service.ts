import { Injectable } from '@angular/core';
import  firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { UsuariosService } from './usuarios.service';
import { UsuarioModel } from 'src/models/usuario.model';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private afAuth: AngularFireAuth, private _user: UsuariosService) {
    
   }
  //Registra un usuario en firebase y envia un correo
   registrar(email,pass) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    sessionStorage.setItem('creado', 'si');
    return firebase.auth().createUserWithEmailAndPassword(email,pass);
   }

    loggin(email, pass){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    return firebase.auth().signInWithEmailAndPassword(email,pass).then(mensaje=>{
      sessionStorage.setItem('Logged', mensaje.user.uid);
      
    });

   }
//Comprueba que un usuario este verificado
   verificacion(){
     firebase.auth().currentUser.sendEmailVerification().then(mensaje=>{
     }).catch(error=>{
       console.log(error.mesagge);
     })
   }
  //Hace logout del usuario loggeado
   logout(){
     firebase.auth().signOut().then(mesaje=>{
       if(sessionStorage.getItem("Logged")){
         sessionStorage.removeItem("Logged");
       }
       
     }).catch(error=>{
       console.log(error);
       
     })
   }
   //Obtiene el usuario con la sesion activa
   obtenerUsuario(){
     return firebase.auth().currentUser;
      
   }
//Envia un correo de reseteo de contraseña
   reseteoContrasena(email){
      firebase.auth().sendPasswordResetEmail(email).then(mensaje=>{
      }).catch(error=>{
        console.log(error.mesagge);
      });
   }
//Borra un usuario de firebase y de la base de datos
   borrarUsuario(){
     const user = firebase.auth().currentUser;
     const usuario:UsuarioModel[] = this._user.getUsuario(user.uid);

     return user.delete().then(()=>{
       this._user.borrarUsuario(usuario[0]).subscribe(data=>{
         console.log(data);
       });
       sessionStorage.setItem('borrado', 'si');
       sessionStorage.removeItem("Logged");
     }).catch(()=>{
      sessionStorage.setItem('borrado', 'no');
     })
   }

}
