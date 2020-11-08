import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// 10.3
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// 10.3
import { SharedModule } from '../shared/shared.module';

// 10.3
import { PortalComponent } from '../dash/portal/portal.component';
import { FeatureComponent } from './feature.component';
import { StatsComponent } from './stats/stats.component';
import { DetailComponent } from './detail/detail.component';
import { TransactionOrderPipe } from '../pipes/transaction-order.pipe';
// Ajuste de rutas hijas | Guard cambiado
import { DashRoutesModule } from '../dash/dash-routes.module';
// 10.5
import { StoreModule } from '@ngrx/store';
import { transactionReducer } from './transaction.reducer';
// 11.2
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [
    PortalComponent ,
    FeatureComponent,
    StatsComponent,
    DetailComponent,
    TransactionOrderPipe
  ],
  imports: [
    CommonModule ,
    StoreModule.forFeature('items' , transactionReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashRoutesModule,
    UsersModule
  ]
})
export class FeatureModule { }
