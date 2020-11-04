import { Component, OnInit, OnDestroy } from '@angular/core';

// 25.b
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// 9.12.3
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
// 9.13.1
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  // || 9.13.1
  username = '';
  userSubscription: Subscription;

  // 25.b  || 9.12.3 || 9.13.1
  constructor( private authService: AuthService , private router: Router, private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
                                      .pipe( filter ( ({user}) => user !== null ))
                                      .subscribe( ({user}) => this.username = user.name );
                                      // .subscribe( ({user}) => this.username = user?.name );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout()
        .then( () => {
           console.log('SidebarComponent.logout() = OK!');
           this.router.navigate(['/login']);
        })
        .catch( err => {
           console.log('SidebarComponent.logout() =' , err);
        });
  }

}
