import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

// Acción de inicio de carga
export const loadEmployees = createAction('[Employees] loading');
// Acción de final de carga satisfactoria : recibe array de empleados
export const loadEmployeesSuccess = createAction('[Employees] load success',
                                                 props<{ employees: Employee[]}>()
                                                 );
// Acción de final de carga erronea : recibe un payload
export const loadEmployeesError = createAction('[Employees] load success',
                                                 props<{ payload: any}>()
                                                 );
// Acción de descargar
export const unloadEmployees = createAction('[Employees] unload');

