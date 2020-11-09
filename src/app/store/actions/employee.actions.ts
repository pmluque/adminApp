import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

// Acción de inicio de carga - recibe un argumento que es su id
export const loadEmployee = createAction('[Employee] loading' ,  props<{ id: string }>());
// Acción de final de carga satisfactoria : recibe empleado
export const loadEmployeeSuccess = createAction('[Employee] load success', props<{ employee: Employee}>() );
// Acción de final de carga erronea : recibe un payload
export const loadEmployeeError = createAction('[Employee] load error', props<{ payload: any}>() );
// Acción de descargar
export const unloadEmployee = createAction('[Employee] unload');

