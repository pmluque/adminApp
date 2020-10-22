import { Routes } from '@angular/router';
import { StatsComponent } from '../../feature/stats/stats.component';
import { EntryRefundComponent } from '../../feature/entry-refund/entry-refund.component';
import { DetailComponent } from '../../feature/detail/detail.component';

export const portalRoutes: Routes = [
  { path: '' , component: StatsComponent},
  { path: 'main' , component: EntryRefundComponent},
  { path: 'detail' , component: DetailComponent},

  { path: '**' , redirectTo: ''}
];


