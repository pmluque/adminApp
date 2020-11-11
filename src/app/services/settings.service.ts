import { Injectable } from '@angular/core';
import { Setting } from '../models/setting.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  menu: any[] = [
    {
      title: 'Utilidades',
      icon: 'fa fa-cogs',
      submenu: [
        {title: 'Download', icon: 'fa-cloud-download' , url: '/dashbord/main'} ,
        {title: 'Upload', icon: 'fa-cloud-upload ', url: '/dashbord/detail'}
      ]
    }
  ];



  constructor() { }

  saveSetting( backColor: string ){

      localStorage.setItem( 'backColor' ,  backColor );
      console.log('SettingsService.saveSetting backColor= ', backColor);
      const setting: Setting = new Setting(backColor);
      return of(setting);
  }

  loadSetting(): Observable<any> {

    const backColor = localStorage.getItem('backColor') || 'bg-dark';
    const setting: Setting = new Setting(backColor);
    console.log('SettingsService.loadSetting backColor= ', setting.backColor );
    return of(setting);
  }

  sidebar() {

  }
}
