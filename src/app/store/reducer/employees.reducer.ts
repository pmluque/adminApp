import { createReducer, on } from '@ngrx/store';
import { loadEmployees, loadEmployeesError, loadEmployeesSuccess, unloadEmployees } from '../actions';
import { Employee } from '../../models/employee.model';
import { AppState } from '../../app.reducer';

export interface AppStateWithTeam extends AppState{
   team: {
     employees: Employee[];
     loaded: boolean;
     loading: boolean;
     error: any;
   };
}

export interface State {
        employees: Employee[];
        loaded: boolean;
        loading: boolean;
        error: any;
}

export const initialState: State = {
        employees: [],
        loaded: false,
        loading: false,
        error: null
};


const _employeesReducer = createReducer(initialState,

    on( loadEmployees, state => ({ ...state, loading: true })),
    on( loadEmployeesSuccess, (state , {employees} ) => ({ ...state, loading: false, loaded: true  , employees: [ ...employees] })),
    on( loadEmployeesError  , (state , {payload} )   => ({ ...state
                                                          , loading: false
                                                          , loaded: false
                                                          , error: { url: payload.url
                                                                   , name: payload.name
                                                                   , message: payload.message
                                                          } })),
    on( unloadEmployees , state => ({...state,  employees: [] , loaded: false , loading:false, error: null }))
);
// 12.5.12
// on( loadEmployeesError  , (state , {payload} )   => ({ ...state, loading: false, loaded: false , error: payload })),

export function employeesReducer(state, action) {
    return _employeesReducer(state, action);
}
