// 8.10
//   ngrx-actions
import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

// Acción setUser que recibe argumento: objeto usuario
export const setUser = createAction('[Auth Component] setUser' , props< {user: User}>() );
// Acción retirar usuario
export const unsetUser = createAction('[Auth Component] unsetUser' );
