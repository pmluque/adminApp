import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import * as settingActions from '../actions/settings.actions';
import { SettingsService } from '../../services/settings.service';
import { of } from 'rxjs';

@Injectable()
export class SettingsEffects {

   constructor(   private actions$: Actions , private settingService: SettingsService) {

   }

   loadSetting$ = createEffect(
    () => this.actions$.pipe(
                ofType( settingActions.loadSetting ),
                tap( data => console.log('SettingsEffects loadSetting$=', data)),
                mergeMap(
                  ( action ) =>  this.settingService.loadSetting()
                                       .pipe(
                                         tap( data => console.log('SettingsEffects loadSetting$ action=', data)),
                                         map( data => settingActions.loadSettingSuccess( {setting: data} ) ),
                                         catchError( err => of( settingActions.loadSettingError({ payload: err }) ) )
                                       )
                )
    )
   );

   saveSetting$ = createEffect(
    () => this.actions$.pipe(
                ofType( settingActions.saveSetting ),
                tap( data => console.log('SettingsEffects saveSetting$=', data)),
                mergeMap(
                  ( action ) =>  this.settingService.saveSetting( action.backColor )
                                       .pipe(
                                         tap( data => console.log('SettingsEffects saveSetting$ action=', data)),
                                         map( data => settingActions.saveSettingSuccess( {setting: data}) ),
                                         catchError( err => of( settingActions.saveSettingError({ payload: err }) ) )
                                       )
                )
    )
   );



  // Ahora ir al componente y: 1) inyectar store  2) invocar acción
}
