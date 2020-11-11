
import { createReducer, on } from '@ngrx/store';
import { loadSetting, loadSettingSuccess, loadSettingError
       , saveSetting, saveSettingSuccess, saveSettingError
       , unloadSetting } from '../actions';
import { Setting } from '../../models/setting.model';
import { AppState } from '../../app.reducer';

export interface AppStateWithSetting extends AppState{
    setting: State;
}

export interface State {
    setting: Setting;
}

export const initialState: State = {
    setting: new Setting('bg-dark')
};


const _settingReducer = createReducer(initialState,

    on( loadSetting, (state ) => ({ ...state})),
    on( loadSettingSuccess, (state , {setting} ) => ({ ...state, setting })),
    on( loadSettingError  , (state , {payload} )   => ({ ...state
                                                          , error: { url: payload.url
                                                                   , name: payload.name
                                                                   , message: payload.message
                                                          } })),

     on( saveSetting, (state , {backColor} ) => ({ ...state, setting: {backColor}})),
     on( saveSettingSuccess, (state , {setting} ) => ({ ...state, setting  })),
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
