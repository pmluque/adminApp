import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import * as memberActions from '../actions/employee.actions';
import { EmployeeService } from '../../services/employee.service';
import { of } from 'rxjs';

@Injectable()
export class EmployeeEffects {

   constructor(   private actions$: Actions , private empService: EmployeeService) {

   }

  loadEmployee$ = createEffect(
    () => this.actions$.pipe(
                ofType( memberActions.loadEmployee ),
                tap( data => console.log('EmployeeEffects data=', data )),
                mergeMap(
                  ( action ) => this.empService.getEmployeeById( action.id )
                                       .pipe(
                                         tap( data => console.log('EmployeeEffects getEmployeeById=', data)),
                                         map( data => memberActions.loadEmployeeSuccess( {employee: data} ) ),
                                         catchError( err => of( memberActions.loadEmployeeError({ payload: err }) ) )
                                       )
                )

    )
    // Ahora ir al componente y: 1) inyectar store  2) invocar acción 'loadEmployees'
  );


}
