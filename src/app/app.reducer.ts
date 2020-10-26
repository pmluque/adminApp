// snipper: ngrx-app-reducer
import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';

export interface AppState {
   ui: ui.State;                     // Referencia a la inferfaz que está en el ui.reducer
   user: auth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer ,
   user: auth.authReducer
}
