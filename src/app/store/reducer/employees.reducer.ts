import { createReducer, on } from '@ngrx/store';
import { loadEmployees, loadEmployeesError, loadEmployeesSuccess, unloadEmployees } from '../actions';
import { Employee } from '../../models/employee.model';
import { AppState } from '../../app.reducer';

export interface EmployeesState extends AppState {
    team: {
            employees: Employee[];
            loaded: boolean;
            loading: boolean;
            error: any;
          };
}

export interface State {
    team: {
        employees: Employee[];
        loaded: boolean;
        loading: boolean;
        error: any;
    };
}

export const initialState: State = {
    team: {
            employees: [],
            loaded: false,
            loading: false,
            error: null
          }
};


const _employeesReducer = createReducer(initialState,

    on( loadEmployees, state => ({ ...state, loading: true })),
    on( loadEmployeesSuccess, (state , {employees} ) => ({ ...state, loading: false, loaded: true  , employees: [ ...employees] })),
    on( loadEmployeesError  , (state , {payload} )   => ({ ...state, loading: false, loaded: false , error: payload })),
    on( unloadEmployees , state => ({...state, team: null }))
);

export function employeesReducer(state, action) {
    return _employeesReducer(state, action);
}
