import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// REDUX
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateWithSetting } from '../../store/reducer/settings.reducer';
import { Setting } from '../../models/setting.model';

@Component({
  selector: 'app-navfinder',
  templateUrl: './navfinder.component.html',
  styleUrls: ['./navfinder.component.css']
})
export class NavfinderComponent implements OnInit, OnDestroy {

  // Propiedades y suscripción del store
  backColor: string; // = 'bg-dark';
  settingSubscription: Subscription;

  // #1 Optimizar las llamadas al DOM : hacerlas propiedades en vez de variables del método
  // public linkTheme = document.querySelector('#theme');  // class="navbar navbar-expand-sm navbar-dark bg-dark"

  constructor( private router: Router , private store: Store<AppStateWithSetting>) { }

  ngOnInit(): void {

    /*
        // Formas de acceder a los selectores
        const linkTheme = document.querySelector('#theme');  // class="navbar navbar-expand-sm navbar-dark bg-dark"
        // const urlTheme  = `./assets/css/color/${ theme }.css`
        // linkTheme.setAttribute('href', urlTheme )
        const classTheme  = `navbar navbar-expand-sm navbar-dark ${ backColor}`;
        linkTheme.setAttribute('class', classTheme )
    */

   this.settingSubscription = this.store.select('setting').subscribe( ( setting ) => {
      console.log('NavfinderComponent settingSubscription - backColor old=' , this.backColor , ' new=' ,  setting.setting.backColor);
      // recoger en propiedades
      this.backColor = setting.setting.backColor;
      // Establecer color
         // Formas de acceder a los selectores
      // Optimizacion #1
      const linkTheme = document.querySelector('#theme');  // class="navbar navbar-expand-sm navbar-dark bg-dark"
         // const urlTheme  = `./assets/css/color/${ theme }.css`
         // linkTheme.setAttribute('href', urlTheme )
      const classTheme  = `navbar navbar-expand-sm navbar-dark ${ this.backColor}`;
      linkTheme.setAttribute('class', classTheme );
    });


  }

  ngOnDestroy() {
    this.settingSubscription.unsubscribe();
  }

  // Acción de la caja buscar
  actionSearch( id: string ) {
    console.log('NavfinderComponent.actionSearch' , id);
    if ( id === null ) { return; }

    this.router.navigate(['/employee', id ]);
  }

}
