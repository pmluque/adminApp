//                  8.8
import { Component, OnDestroy, OnInit } from '@angular/core';

// 23
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// 25.b
import { AuthService } from '../../services/auth.service';
// 26.c
import { Router } from '@angular/router';
// 28 -  ES6 Modules or TypeScript
import Swal from 'sweetalert2';

// 8.7
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as uiActions from '../../shared/ui.actions';  // import { isLoading } from '../../shared/ui.actions';

// 8.8 - Control de las suscripticiones : creación y destrucción
import { Subscription } from 'rxjs';


// -------------------------------------------------
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{    // 8.8
// 8.7
loading = false;
// 8.8
uiSubscription: Subscription;

// 23.a
formGroup: FormGroup;

  // 23.a | 25.b | 26.c | 8.7
  constructor( private form: FormBuilder ,
               private authService: AuthService,
               private router: Router,
               private store: Store<AppState>) { }

  ngOnInit(): void {
    // 23.a
    this.formGroup = this.form.group( {
      email: ['pedro1@test.com', [Validators.required, Validators.email ]] ,
      password: ['123456', Validators.required ]
    });

    // 8.7 Mapeo propiedad local con propiedad en el state
    this.uiSubscription = this.store.select('ui').subscribe( ui => {
        this.loading = ui.isLoading;
        console.log('loginComponent.ngOnInit (SUBSCRIPTION a STATE ui) loading = ' , this.loading );
    });
  }

  // 8.8 - Destruir suscripción
  // Se dispara cuando se abandona la página
  ngOnDestroy() {
    console.log('UNSUBSCRIBE del state UI !' );
    this.uiSubscription.unsubscribe();
  }

  // 27
  login() {
    console.log( this.formGroup );
    console.log( this.formGroup.valid );
    console.log( this.formGroup.value );
    if ( this.formGroup.invalid ) { return; }

    // 8.7
    // REDUX: dispatch acción
    this.store.dispatch( uiActions.startLoading() );

    // 28
    // loading
    // 8.7 -- comentar porque se va a cambiar
    // Swal.fire({
    //  title: 'Espere por favor... !',
    //  onBeforeOpen: () => {
    //    Swal.showLoading();
    //  }
    // });

    // 25.b
    const { name, email, password } = this.formGroup.value;
    this.authService.loginUser( email, password)
                    .then( credentials =>  {
                        console.log( credentials );
                        // 28
                        // 8.7
                        // Swal.close();

                        // 8.7 - dispatch nueva acción
                        this.store.dispatch( uiActions.stopLoading() );

                        // 26.c
                        this.router.navigate(['/']);
                    } )
                    .catch( err => {
                        console.error( err );
                        // 8.7 - dispatch nueva acción
                        this.store.dispatch( uiActions.stopLoading() );

                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: err.message
                        });
                    });

  }


}
