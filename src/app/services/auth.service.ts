import { Injectable } from '@angular/core';
// Incorporar FIREBASE > Ahora inyectar en constructor
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';  // 32
// 31
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 26.a
  constructor( private auth: AngularFireAuth , private firestore: AngularFirestore) { }
  // 25.a
  createUser( name: string, email: string , password: string) {
      console.log('AuthService.createUser = ' + name + ' - ' + email + ' - ' + password );
      // Devuelve promesa por lo que en componente debe escucharse la respuesta
      // 32 Utilizamos la promesa
      // return this.auth.createUserWithEmailAndPassword( email , password );
      return this.auth.createUserWithEmailAndPassword( email , password )
                // 32. ejemplo sin desestructurar
                // .then( fbUser => {
                //      const user = new User( fbUser.user.uid, name, fbUser.user.email );
                // })
                // .catch( err => {
                //     console.log('AuthService.createUser =' , err);
                // });
                // 32. ejemplo CON desestructurar
                .then( ({ user }) => {
                     const userModel = new User( user.uid, name, user.email );
                     // return porque debe devolver una promesa para que siga funcionando el login
                     // el .set no esperar mi clase modelo, por tanto la desestructuro
                     // return this.firestore.doc(`/users/${ user.uid}`).set( userModel );
                     return this.firestore.doc(`/users/${ user.uid}`).set( {...userModel} );
                })
                .catch( err => {
                    console.log('AuthService.createUser error=' , err);
                    throw err;
                });
  }
  // 27.
  loginUser( email: string , password: string ) {
    console.log('AuthService.loginUser = ' + name + ' - ' + email + ' - ' + password );
    // Devuelve promesa por lo que en componente debe escucharse la respuesta
    return this.auth.signInWithEmailAndPassword( email , password );
  }

  // 29
  logout() {
     return this.auth.signOut();
  }

  // 30 :
  initAuthListener() {
    // es una fachada para controlar cuando el usaurio está logeado o no.
    // también para cuando solicite una ruta y se tenga que comprobar si puede entrar o no.
    this.auth.authState.subscribe(  fuser => {
         console.log('AuthService.initAuthListener() =' , fuser );
         console.log('AuthService.initAuthListener() =' , fuser?.uid );
         console.log('AuthService.initAuthListener() =' , fuser?.email );
    });
  }

  // 31 , llamarlo desde el guard
  isAuth() {
    // authState devuelve un observable.
    // Lo paso por el pipe para mapear la salida como un booleano que es lo que necesito.
    return this.auth.authState.pipe(
       map( fuser => fuser != null )
    );
  }
}
