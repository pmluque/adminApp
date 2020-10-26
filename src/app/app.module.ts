import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 23 FOMRULARIOS CONFIGURAR
import { ReactiveFormsModule } from '@angular/forms';
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
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PortalComponent } from './dash/portal/portal.component';
import { FeatureComponent } from './feature/feature.component';
import { EntryRefundComponent } from './feature/entry-refund/entry-refund.component';
import { StatsComponent } from './feature/stats/stats.component';
import { DetailComponent } from './feature/detail/detail.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PortalComponent,
    FeatureComponent,
    EntryRefundComponent,
    StatsComponent,
    DetailComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
