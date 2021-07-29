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

   verificacion(){
     firebase.auth().currentUser.sendEmailVerification().then(mensaje=>{
     }).catch(error=>{
       console.log(error.mesagge);
     })
   }
   logout(){
     firebase.auth().signOut().then(mesaje=>{
       if(sessionStorage.getItem("Logged")){
         sessionStorage.removeItem("Logged");
       }
       
     }).catch(error=>{
       console.log(error);
       
     })
   }
   obtenerUsuario(){
     return firebase.auth().currentUser;
      
   }

   reseteoContrasena(email){
      firebase.auth().sendPasswordResetEmail(email).then(mensaje=>{
      }).catch(error=>{
        console.log(error.mesagge);
      });
   }

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
