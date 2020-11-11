import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
// import { changeTheme } from '../../shared/ui.actions';
import { AppStateWithSetting } from '../../store/reducer/settings.reducer';
import * as settingActions from '../../store/actions';
import { Setting } from '../../models/setting.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit , OnDestroy{

  // Propiedades y suscripción del store
  setting: Setting = new Setting();
  settingSubscription: Subscription;

  constructor(private store: Store<AppStateWithSetting>) { }

  ngOnInit(): void {
    this.settingSubscription = this.store.select('setting').subscribe( ( setting ) => {
      // recoger en propiedades
      console.log('SettingsComponent.onInit - backColor old=' , this.setting.backColor , ' new=' ,  setting.setting.backColor);
      this.setting.backColor = setting.setting.backColor;
    });
  }

  ngOnDestroy() {
    this.settingSubscription.unsubscribe();
  }

  changeTheme( backColor: string ) {
    // this.store.dispatch( changeTheme( {backColor} ) );
    console.log('SettingsComponent.changeTheme - backColor old=' , this.setting.backColor , ' new=' ,  backColor);
    this.store.dispatch( settingActions.saveSetting( {backColor} ));
  }

}
