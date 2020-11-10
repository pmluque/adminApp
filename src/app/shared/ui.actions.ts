// snipper: ngrx-actions
import { createAction, props } from '@ngrx/store';

export const startLoading   = createAction('[UI Component] startLoading');
export const stopLoading    = createAction('[UI Component] stopLoading');

export const changeTheme    = createAction('[UI Component] Change Theme'
                                , props<{backColor: string}>());
