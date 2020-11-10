import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { StoreModule } from '@ngrx/store';
import { settingReducer } from '../store/reducer/settings.reducer';



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('setting' , settingReducer),
  ]
})
export class PagesModule { }
