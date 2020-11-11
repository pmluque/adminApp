import { createAction, props } from '@ngrx/store';
import { Setting } from '../../models/setting.model';

// Acción de inicio de carga
export const loadSetting = createAction('[Setting] loading');
// Acción de final de carga satisfactoria : recibe objeto setting
export const loadSettingSuccess = createAction('[Setting] load success',
                                                 props<{setting: Setting}>()
                                                 );
// Acción de final de carga erronea : recibe un payload
export const loadSettingError = createAction('[Setting] load error',
                                                 props<{payload: any}>()
                                                 );

// Acción de inicio de carga
export const saveSetting = createAction('[Setting] saving',
                                         props<{backColor: string}>()
                                      );
// Acción de final de carga satisfactoria : recibe objeto setting
export const saveSettingSuccess = createAction('[Setting] save success',
                                                props<{setting: Setting}>()
                                                );
// Acción de final de carga erronea : recibe un payload
export const saveSettingError = createAction('[Setting] save error',
                                                 props<{payload: any}>()
                                                 );

// Acción de descargar
export const unloadSetting = createAction('[Setting] unload');
