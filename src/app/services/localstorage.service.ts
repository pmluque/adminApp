import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setProperty( name: string , value: string ) {

      localStorage.setItem( name , value);
  }

  getProperty( name: string ) {

    return localStorage.getItem( name );
  }
}
