import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 10.1.3
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 10.1.1
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent ,
    RegisterComponent
  ],
  imports: [
    CommonModule ,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthModule { }
