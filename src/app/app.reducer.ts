// snipper: ngrx-app-reducer
import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
// 10.5.2 import * as trans from './feature/transaction.reducer';

export interface AppState {
   ui: ui.State;                     // Referencia a la inferfaz que está en el ui.reducer
   user: auth.State;
   // 10.5.2 items: trans.State;
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer ,
   user: auth.authReducer
   // 10.5.2 items: trans.transactionReducer
}
// *** los datas específicos estarán en los módulos específicos ***
