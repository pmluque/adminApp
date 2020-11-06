import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// 23 FOMRULARIOS CONFIGURAR
// import { ReactiveFormsModule } from '@angular/forms';
// 24 FIREBASE CONFIGURAR
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// 8.5
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
// 8.6
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// --------------
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 10.1
import { AuthModule } from './auth/auth.module';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';

// 10.3
// LAZY LOAD: import { FeatureModule } from './feature/feature.module';
// import { PortalComponent } from './dash/portal/portal.component';
// import { FeatureComponent } from './feature/feature.component';
// import { StatsComponent } from './feature/stats/stats.component';
// import { DetailComponent } from './feature/detail/detail.component';
// import { TransactionOrderPipe } from './pipes/transaction-order.pipe';

// 10.2
// => Este solo se usa en feature: import { SharedModule } from './shared/shared.module';
// import { FooterComponent } from './shared/footer/footer.component';
// import { NavbarComponent } from './shared/navbar/navbar.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';



// 9.12.1 | 9.12.2
// import { ChartsModule } from 'ng2-charts';
// import { DashRoutesModule } from './dash/dash-routes.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
