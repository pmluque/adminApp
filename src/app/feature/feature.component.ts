import { Component, OnInit, OnDestroy } from '@angular/core';

  // 9.3 - formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../models/transaction.model';
// 9.4.5
import { TransactionService } from '../services/transaction.service';
// 9.4.6
import Swal from 'sweetalert2';

// 9.5 - Cargar el store
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { startLoading, stopLoading } from '../shared/ui.actions';  // ||  import * as ui from ...
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit, OnDestroy {
  // 9.5 (2)
  loading = false;
  loadingSubscription: Subscription;

  // 9.4
  type = 'I'; // Ingreso (I) o reintegro (R)
  // 9.3 - formularios reactivos
  formGroup: FormGroup;

  // 9.3 - formularios reactivos | 9.5 - Cargar el store (1)
  constructor( private form: FormBuilder
             , private transService: TransactionService
             , private store: Store<AppState>) { }


  ngOnInit(): void {
    // 9.5 - suscribirse (3)
    this.loadingSubscription = this.store.select('ui').subscribe( ui => {
        this.loading = ui.isLoading;
    });

    // 9.3 - formularios reactivos
    this.formGroup = this.form.group( {
      desc: ['Transacción 1', [Validators.required ]] ,
      amount: ['0', Validators.required ]
    });

  }

  // Evita fugas de memoria
  ngOnDestroy() {
    // Anulamos suscripción en esta página
    this.loadingSubscription.unsubscribe();
  }

  transaction() {


    if (this.formGroup.invalid) { return; }

    // 9.5 - disparar accion (4)
    this.store.dispatch( startLoading() );

    /*
    setTimeout( () => {
      this.store.dispatch( stopLoading() );  // 9.5 - disparar accion (4)
    }, 2500);
    */

    console.log('featureComponent.transaction() formGroup=' , this.formGroup );
    console.log('featureComponent.transaction()      type=' , this.type );
    // desestructurar el objeto formulario
    const { desc , amount } = this.formGroup.value;
    // Cargar el modelo
    const transaction = new Transaction( desc , amount , this.type );
    // Llamar a servicio | devuelve una promesa
    // this.transService.create( transaction );
    // El control de la promesa se hace aqui
    this.transService.create( transaction )
                     .then( () => {
                         // 9.5 cancelar
                         this.store.dispatch( stopLoading() );
                         // Mostrar popup
                         Swal.fire('Transacción realizada!' , desc , 'success');
                         // Limpiar formulario
                         this.formGroup.reset();
                     } )
                     .catch( err => {
                         // 9.5 cancelar
                         this.store.dispatch( stopLoading() );
                         // Mostrar popup
                         Swal.fire('Transacción no realizada!' , err.message , 'error');
                     });
  }

}
