import { Component, OnInit, OnDestroy } from '@angular/core';
// 23
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// 25.b
import { AuthService } from '../../services/auth.service';
// 26.c
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// 8.7 - suscripciones y dispatch
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as uiActions from '../../shared/ui.actions';
// 8.8 - control de suscripciones
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit , OnDestroy {

  // 8.7
  loading = false;
  // 8.8
  uiSubscription: Subscription;

  // 23.a
  formGroup: FormGroup;
  // 23.a | 25.b | 26.c | 8.7
  constructor( private form: FormBuilder ,
               private authService: AuthService,
               private store: Store<AppState> ,
               private router: Router
   ) { }

  ngOnInit(): void {
    this.formGroup = this.form.group( {
        name: ['', Validators.required ] ,
        email: ['', [Validators.required, Validators.email ]] ,
        password: ['', Validators.required ]

    });

    // 8.7 Mapeo propiedad local con propiedad en el state
    this.uiSubscription = this.store.select('ui').subscribe( ui => {
          this.loading = ui.isLoading;
          console.log('registerComponent.ngOnInit (suscripción) loading = ' , this.loading );
    });

  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  register() {
      console.log( this.formGroup );
      console.log( this.formGroup.valid );
      console.log( this.formGroup.value );
      if ( this.formGroup.invalid ) { return; }
      // 8.7  Dispatch de acciones
      this.store.dispatch( uiActions.startLoading() );
      // -------------------------------------
      // 28
      // loading
      Swal.fire({
        title: 'Espere por favor... !',
        willOpen: () => {
          Swal.showLoading();
        }
      });

      // 25.b
      const { name, email, password } = this.formGroup.value;
      this.authService.createUser(name, email, password)
                      .then( credentials =>  {
                          console.log(  'register.register() (credentials)=' , credentials );
                          // 8.7 - dispatch nueva acción
                          this.store.dispatch( uiActions.stopLoading() );
                          // 28
                          Swal.close();
                          // 26.c
                          this.router.navigate(['/']);
                      } )
                      .catch( err => {
                          console.error( 'register.register() err=' , err );
                          // 8.7 - dispatch nueva acción
                          this.store.dispatch( uiActions.stopLoading() );
                          // 28
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.message
                          });
                      });
  }

}
