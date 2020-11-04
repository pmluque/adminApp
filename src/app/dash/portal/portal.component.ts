import { Component, OnInit, OnDestroy } from '@angular/core';
// 9.7.2
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
// 9.7.5
import { TransactionService } from '../../services/transaction.service';
import { setItems } from '../../feature/transaction.actions';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit , OnDestroy {

  // Propiedades que cogemos del store

  // Suscripción para la desuscripcion
  userSubscription: Subscription;
  // 9.7.6
  itemsSubscription: Subscription;

  // 9.7.2
  constructor( private store: Store<AppState> , private transService: TransactionService) { }

  ngOnInit(): void {
    // 9.7.2
    this.userSubscription = this.store.select('user')
              .pipe( filter( auth => auth.user != null ) )
              .subscribe( ({user}) => {
                  console.log('user =' , user);
                  // recoger registros "items"
                  // this.transService.initTransactionListener( user.uid );  // 9.7.5 - desestructurar
                  // 9.7.6
                  this.itemsSubscription = this.transService.initTransactionListener( user.uid )
                                   .subscribe( items => {
                                     console.log('PortalComponent items =' , items);
                                     // llamar a la acción para setear en el STORE estos datos
                                     this.store.dispatch( setItems({ items }) );
                                   });

              });
  }

  ngOnDestroy() {
    // 9.7.2
    this.userSubscription.unsubscribe();
    // 9.7.6
    this.itemsSubscription.unsubscribe();
  }

}
