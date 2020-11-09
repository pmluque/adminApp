import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import * as teamActions from '../actions/employees.actions';
import { EmployeeService } from '../../services/employee.service';
import { of } from 'rxjs';

@Injectable()
export class EmployeesEffects {
   // Ir a https://ngrx.io/  @ngrx/effects
   // 12.5.7
   // ---- todas las propiedades acabadas en $ es un observable
   constructor(   private actions$: Actions , private empService: EmployeeService) {

   }

   /* Ej. 1 - efecto que responde a cualquier acción, sea cual sea
   loadEmployees$ = createEffect(
     () => this.actions$
   );
   */
  loadEmployees$ = createEffect(
    () => this.actions$.pipe(
                ofType( teamActions.loadEmployees ),
                tap( data => console.log('EmployeesEffects data=', data )),
                mergeMap(
                  () => this.empService.getEmployees()
                                       .pipe(
                                         tap( data => console.log('EmployeesEffects getEmployee=', data)),
                                         map( data => teamActions.loadEmployeesSuccess( {employees: data} ) ),
                                         catchError( err => of( teamActions.loadEmployeesError({ payload: err }) ) )
                                       )
                )

    )
    // Ahora ir al componente y: 1) inyectar store  2) invocar acción 'loadEmployees'
  );


}
