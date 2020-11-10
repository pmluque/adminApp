// snipper: ngrx-reducer
import { createReducer, on } from '@ngrx/store';
import { startLoading , stopLoading , changeTheme } from './ui.actions';

export interface State {
    isLoading: boolean ;
    backColor: string  ;
}

function getBackColor() {
  return localStorage.getItem('backColor') || 'bg-dark';
}

export const initialState: State = {
  isLoading: false ,
  backColor: getBackColor()
};

const _uiReducer = createReducer(initialState,

    on(startLoading  , state => ({ ...state, isLoading:  true })),
    on(stopLoading   , state => ({ ...state, isLoading:  false })),
    on(changeTheme   , (state, {backColor} ) => ({ ...state, backColor  }))

);



export function uiReducer(state, action) {
    return _uiReducer(state, action);
}


