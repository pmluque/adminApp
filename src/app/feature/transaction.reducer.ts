// 9.6
// Se viene del transaction.actions
import { createReducer, on } from '@ngrx/store';
import { setItems , unsetItems } from './transaction.actions';
import { Transaction } from '../models/transaction.model';

export interface State {
    items: Transaction[];
}

export const initialState: State = {
  items: [],
}

const _transactionReducer = createReducer(initialState,

    on(setItems, (state, { items } ) => ({...state, items: [...items]})    ),
    on(unsetItems , state => ({...state, items: []}))
);

export function transactionReducer(state, action) {
    return _transactionReducer(state, action);
}

// Ahora ir al app.reducer global para publicar este nuevo STATE
