import { Routes } from '@angular/router';
import { StatsComponent } from '../../feature/stats/stats.component';
import { DetailComponent } from '../../feature/detail/detail.component';
import { FeatureComponent } from '../../feature/feature.component';
import { ListComponent } from '../../users/list/list.component';
import { EmployeeComponent } from '../../users/employee/employee.component';
import { SettingsComponent } from '../../pages/settings/settings.component';


export const portalRoutes: Routes = [
  { path: '' , component: StatsComponent},
  { path: 'main' , component: FeatureComponent},
  { path: 'detail' , component: DetailComponent},
  { path: 'list' , component: ListComponent},
  { path: 'employee/:id' , component: EmployeeComponent},
  { path: 'settings' , component: SettingsComponent},
  { path: '**' , redirectTo: ''}
];


