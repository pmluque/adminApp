// ngrx-reducer
import { createReducer, on } from '@ngrx/store';
import { setUser , nullUser } from './auth.actions';
// 8.10
import { User } from '../models/user.model';

export interface State {
    user: User;
}

export const initialState: State = {
   user: null
}

const _authReducer = createReducer(initialState,

    on( setUser , (state , {user}) => ({ ...state, user: { ...user} })),
    on( nullUser , (state ) => ({ ...state, user: null }))

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}