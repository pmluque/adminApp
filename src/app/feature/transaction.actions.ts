// 9.6
// Se comienza definiendo las acciones
import { createAction, props } from '@ngrx/store';
import { Transaction } from '../models/transaction.model';

export const unsetItems = createAction('[Feature Component] Unset Items');
export const setItems   = createAction('[Feature Component] Set Items' ,
               props<{items: Transaction[]}>()
            );

// se continua implementándolas en el reducer...
