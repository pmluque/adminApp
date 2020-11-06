import { Injectable } from '@angular/core';
// Incorporar FIREBASE > Ahora inyectar en constructor
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';  // 32
// 31
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
// 8.10
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
// 8.11  Control suscripción
import { Subscription } from 'rxjs';
// 9.8.7
import * as transActions from '../feature/transaction.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 9.4 - propiedad para tener accesible el usuario y poder manejarlos en otros servicios
  private _user: User;
  // ----- La sintaxis es si es privada, ponemos un _ y creamos los métodos que solo permiten leer
  get user(): User {
    return {...this._user};   // para evitar mutaciones usamos el operador ...
  }

  // 8.11  Control suscripción
  authSubscription: Subscription;

  // 26.a  | 8.10
  constructor( private auth: AngularFireAuth ,
               private firestore: AngularFirestore ,
               private store: Store<AppState> ) { }
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
                    console.error('AuthService.createUser error=' , err);
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
    // --- esta suscripción no es necesaria porque solo se lanza una vez en la aplicación
    this.auth.authState.subscribe(  fuser => {
         console.log('AuthService.initAuthListener() =' , fuser );
         console.log('AuthService.initAuthListener() =' , fuser?.uid );
         console.log('AuthService.initAuthListener() =' , fuser?.email );
         // 8.10
         if ( fuser ){
           // existe el usuario
           // suscripción a registros
           // ---- tengo qeu dessuscribirme, porque si hago logout, la suscripción seguiría recibiendo valores.
           // 8.11
           this.authSubscription = this.firestore.doc(`/users/${ fuser.uid}`).valueChanges()
                         .subscribe( (firestoreUser: any) => {
                           console.log('AuthService.initAuthListener() firestoreUser = ' , firestoreUser);
                           // conversión entre firestoreUser y userModel
                           // usar un método estático en el modelo específico para la conversion
                           const user = User.fromFirestore( firestoreUser );
                           // 9.4 - Asignar propiedad usuario de firestoreUser | y no olvidar limpiarlo
                           this._user = user;
                           // -----------------------------
                           this.store.dispatch( authActions.setUser( {user} ) );
                         } );
           console.log('SUBSCRIBE del authSubscription a FIRESTORE !' );
         } else {
           // NO existe el usuario
           // 9.4 - Asignar propiedad usuario de firestoreUser | y no olvidar limpiarlo
           this._user = null;

           // 8.11
           if ( this.authSubscription) {
             this.authSubscription.unsubscribe();    // Alternativa al IF: this.authSubscription?.unsubscribe();
             console.log('UNSUBSCRIBE del authSubscription a FIRESTORE !' );
            }

           // 8.10
           this.store.dispatch( authActions.nullUser() );
           // 9.8.7
           this.store.dispatch( transActions.unsetItems() );
         }

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
