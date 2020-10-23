import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PortalComponent } from './dash/portal/portal.component';
import { portalRoutes } from './dash/portal/portal.routers';
// 31
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component: RegisterComponent},
  { path: '' , component: PortalComponent , children: portalRoutes , canActivate: [ AuthGuard ]},    // 31
  { path: '**' , redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
