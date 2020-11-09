import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';


// 12.4.4
import { HttpClientModule } from '@angular/common/http';
import { employeesReducer } from '../store/reducer/employees.reducer';
import { StoreModule } from '@ngrx/store';

// 12.5.8
import { EffectsModule } from '@ngrx/effects';
// 12.5.10
import { EffectArray } from '../store/effects';
// 12.5.13
import { employeeReducer } from '../store/reducer/employee.reducer';

// 12.5.15 - borrar user.component y crear employee.component
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [ListComponent , EmployeeComponent],
  imports: [
    CommonModule,
    HttpClientModule,      // 12.4.4
    StoreModule.forFeature('team' , employeesReducer),  // 12.5.8
    StoreModule.forFeature('member' , employeeReducer),  // 12.5.13
    EffectsModule.forRoot( EffectArray )
  ],
  exports: [ListComponent , EmployeeComponent]
})
export class UsersModule { }
