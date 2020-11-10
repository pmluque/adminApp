
import { createReducer, on } from '@ngrx/store';
import { loadSetting, loadSettingSuccess, loadSettingError
       , saveSetting, saveSettingSuccess, saveSettingError
       , unloadSetting } from '../actions';
import { Setting } from '../../models/setting.model';
import { AppState } from '../../app.reducer';

export interface AppStateWithSetting extends AppState{
   setting: {
     backColor: string;
   };
}

export interface State {
    backColor: string;
}

export const initialState: State = {
        backColor: ''
};


const _settingReducer = createReducer(initialState,

    on( loadSetting, (state ) => ({ ...state})),
    on( loadSettingSuccess, (state , {setting} ) => ({ ...state, setting: { ...setting} })),
    on( loadSettingError  , (state , {payload} )   => ({ ...state
                                                          , error: { url: payload.url
                                                                   , name: payload.name
                                                                   , message: payload.message
                                                          } })),

     on( saveSetting, (state , {setting} ) => ({ ...state, setting: { ...setting}})),
     on( saveSettingSuccess, (state ) => ({ ...state })),
     on( saveSettingError  , (state , {payload} )   => ({ ...state
                                                           , error: { url: payload.url
                                                                    , name: payload.name
                                                                    , message: payload.message
                                                           } })),
     on( unloadSetting , state => ({...state, setting: null , error: null }))
);

export function settingReducer(state, action) {
    return _settingReducer(state, action);
}
