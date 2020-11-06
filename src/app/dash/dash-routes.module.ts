import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { portalRoutes } from './portal/portal.routers';
// El guard no puede ser canActivated porque ya es tarde
// import { AuthGuard } from '../services/auth.guard';

const routesChilden: Routes = [
   { path: '' , component: PortalComponent , children: portalRoutes},    // 31
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routesChilden )
  ],
  exports: [
    RouterModule
  ]
})
export class DashRoutesModule { }
