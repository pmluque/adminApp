import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
// 31
import { AuthService } from './auth.service';

// 31
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate , CanLoad {

  constructor( private authService: AuthService ,
               private router: Router ) {

  }

  // Devuelve un observable que devuelve un booleano
  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
               .pipe(
                 tap(  status => {
                    if ( !status ) { this.router.navigate(['/login']); }
                 })
               );
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth()
               .pipe(
                 tap(  status => {
                    if ( !status ) { this.router.navigate(['/login']); }
                 }),
                 take(1)  // cuando se crea se cancela la suscripción
               );
  }

}
