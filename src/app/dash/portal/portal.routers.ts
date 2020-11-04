import { Routes } from '@angular/router';
import { StatsComponent } from '../../feature/stats/stats.component';
import { DetailComponent } from '../../feature/detail/detail.component';
import { FeatureComponent } from '../../feature/feature.component';

export const portalRoutes: Routes = [
  { path: '' , component: StatsComponent},
  { path: 'main' , component: FeatureComponent},
  { path: 'detail' , component: DetailComponent},

  { path: '**' , redirectTo: ''}
];


