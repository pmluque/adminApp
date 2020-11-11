import { createReducer, on } from '@ngrx/store';
import { loadEmployee, loadEmployeeError, loadEmployeeSuccess, unloadEmployee } from '../actions';
import { Employee } from '../../models/employee.model';
import { AppState } from '../../app.reducer';

export interface AppStateWithMember extends AppState{
   member: State;
}

export interface State {
        id: string;
        employee: Employee;
        loaded: boolean;
        loading: boolean;
        error: any;
}

export const initialState: State = {
        id: null,
        employee: null,
        loaded: false,
        loading: false,
        error: null
};


const _employeeReducer = createReducer(initialState,

    on( loadEmployee, (state , {id}) => ({ ...state, loading: true, id})),
    on( loadEmployeeSuccess, (state , {employee} ) => ({ ...state, loading: false, loaded: true  , employee: { ...employee} })),
    on( loadEmployeeError  , (state , {payload} )   => ({ ...state
                                                          , loading: false
                                                          , loaded: false
                                                          , error: { url: payload.url
                                                                   , name: payload.name
                                                                   , message: payload.message
                                                          } })),
    on( unloadEmployee , state => ({...state, id: null , employee: null , loaded: false , loading: false, error: null }))
);
// 12.5.12
// on( loadEmployeesError  , (state , {payload} )   => ({ ...state, loading: false, loaded: false , error: payload })),

export function employeeReducer(state, action) {
    return _employeeReducer(state, action);
}
