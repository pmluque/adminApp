import { Component, OnInit, OnDestroy } from '@angular/core';
// 9.8.1
import { Transaction } from '../../models/transaction.model';
import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
// 9.9.2
import { TransactionService } from '../../services/transaction.service';
import Swal from 'sweetalert2';
// 10.5.2
import { AppStateWithItems } from '../transaction.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit , OnDestroy{

  // 9.8.1
  transactionModel: Transaction[] = [];
  // 9.9.2
  transactionSubscription: Subscription;

  // 9.8.1 | 9.9.2
  constructor( private store: Store<AppStateWithItems> , private transService: TransactionService) { }

  ngOnInit(): void {
    // 9.8.1
    /* Así se accede a los items como un paquete, acceso al array
    this.store.select('items')
              .subscribe( items => {
                 console.log('DetailComponent items=' , items);
              });
    */
   // Desestructurar permite acceder en modo registro
   //  9.8.1 | 9.8.2
   this.transactionSubscription = this.store.select('items')
   .subscribe( ({items}) => {
      // console.log('DetailComponent items=' , items);
      this.transactionModel = items;
   });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    // 9.8.2
    this.transactionSubscription.unsubscribe();
    return;
  }

  /**
   *
   * @param uid
   *
   * Arquitectura
   * --------------
   * component (delete) --> servicio
   *   detail.component.delete(uidItem) --> transaction.service.deleteItem( uidItem )

   * Inyectar servicio y usar
   *
   */
  delete( uidItem: string ) {
     console.log('uidItem =' , uidItem );
     // 9.9.2
     this.transService.deleteItem( uidItem )
                .then( ()   => Swal.fire('Borrado', 'Item borrado', 'success') )
                .catch( err => Swal.fire('Borrado', 'Imposible borrar:' + err.message, 'error'));

  }

}
