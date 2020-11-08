import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';

// 12.4.4
import { HttpClientModule } from '@angular/common/http';
import { employeesReducer } from '../store/reducer/employees.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [ListComponent, UserComponent],
  imports: [
    CommonModule,
    HttpClientModule,      // 12.4.4
    StoreModule.forFeature('team' , employeesReducer),
  ],
  exports: [ListComponent, UserComponent]
})
export class UsersModule { }
