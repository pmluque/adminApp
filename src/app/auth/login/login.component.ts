import { Component, OnInit } from '@angular/core';

// 23
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// 25.b
import { AuthService } from '../../services/auth.service';
// 26.c
import { Router } from '@angular/router';
// 28 -  ES6 Modules or TypeScript
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

// 23.a
formGroup: FormGroup;

  // 23.a | 25.b | 26.c
  constructor( private form: FormBuilder , private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    // 23.a
    this.formGroup = this.form.group( {
      email: ['', [Validators.required, Validators.email ]] ,
      password: ['', Validators.required ]
    });
  }

  // 27
  login() {
    console.log( this.formGroup );
    console.log( this.formGroup.valid );
    console.log( this.formGroup.value );
    if ( this.formGroup.invalid ) { return; }

    // loading
    Swal.fire({
      title: 'Espere por favor... !',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    // 25.b
    const { name, email, password } = this.formGroup.value;
    this.authService.loginUser( email, password)
                    .then( credentials =>  {
                        console.log( credentials );
                        // 28
                        Swal.close();

                        // 26.c
                        this.router.navigate(['/']);
                    } )
                    .catch( err => {
                        console.error( err );
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: err.message
                        });
                    });

  }


}
