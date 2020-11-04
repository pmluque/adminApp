import { Injectable } from '@angular/core';
// 9.4
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from '../models/transaction.model';
import { AuthService } from './auth.service';

// 9.7.5
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  // 9.4
  constructor( private firestore: AngularFirestore , private authService: AuthService ) { }

  create( transaction: Transaction ) {
    // 9.4
    // Recogemos del usuario el uid
    const uid = this.authService.user.uid;
    console.log('Ref uid=', uid );
    console.log('Transaction=', {...transaction} );
    // Insertar una nueva colección. No es un documento
    /*
    return this.firestore.collection('items')
                         .doc(`${ uid }`)
                         .set( {...transaction} )
                         .then( (ref) => { console.log('new item : ' , `/items/${ uid }` ); })
                         .catch( err => console.warn( err ) );
    */

    // Si hubiera que eliminar propiedades
    // delete transaction.uid;
    //
    // Ahora , el resultado de la promesa se delega en el componente
    return this.firestore.doc(`/users/${ uid }`)
                         .collection('items')
                         .add( {...transaction} );


  }

  // Listener
  /**
   * Devuelve la colección de datos items incluido el uid de cada item para luego poder borrarlo o modificarlo.
   * @param uid : id de usuario
   */
  initTransactionListener( uid: string ) {

    /* valueChanges es solo el array de valores de datos
    this.firestore.collection( `/users/${ uid }/items`)
                  .valueChanges()
                  .subscribe( data => {
                    console.log( 'TransactionService.initTransactionListener() =' , data );
                  });
    */

   /* el snapshot devuelve info con campo y valor */
   return this.firestore.collection( `/users/${ uid }/items`)
                 .snapshotChanges()
                 .pipe(
                   map   ( snapshop => snapshop.map( doc => ({
                           uid: doc.payload.doc.id ,
                           ...doc.payload.doc.data() as any
                         })
                       )
                   )
                 );
    // el retorno se vuelve al .ts de dashobard

  }

  // Borrar item
  deleteItem( uidItem: string ) {

    const uid = this.authService.user.uid;
    return this.firestore.doc( `/users/${ uid }/items/${ uidItem }`).delete();

  }



}
