import { Component, OnInit } from '@angular/core';
// 23
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// 25.b
import { AuthService } from '../../services/auth.service';
// 26.c
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // 23.a
  formGroup: FormGroup;
  // 23.a | 25.b | 26.c
  constructor( private form: FormBuilder , private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.formGroup = this.form.group( {
        name: ['', Validators.required ] ,
        email: ['', [Validators.required, Validators.email ]] ,
        password: ['', Validators.required ]

    });
  }

  register() {
      console.log( this.formGroup );
      console.log( this.formGroup.valid );
      console.log( this.formGroup.value );
      if ( this.formGroup.invalid ) { return; }
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
                        // 28
                        Swal.close();
                        // 26.c
                        this.router.navigate(['/']);

                      } )
                      .catch( err => {
                          console.error( 'register.register() err=' , err );
                          // 28
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.message
                          });
                      });


  }

}
