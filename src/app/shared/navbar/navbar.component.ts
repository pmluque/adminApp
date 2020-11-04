import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , OnDestroy {

  // 9.13.1
  username = '';
  userSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
                                      .pipe( filter ( ({user}) => user !== null ))
                                      .subscribe( ({user}) => this.username = user.name );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
