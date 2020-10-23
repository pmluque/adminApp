import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
// 31
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

// 31
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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

}
