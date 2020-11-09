import { Injectable } from '@angular/core';
// 12.4.5
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URL = 'https://reqres.in/api';

  constructor( private http: HttpClient ) { }

  // 12.4.3
  getEmployees() {
    /*
    return this.http.get(`${this.URL}/users?per_page=6`)
                    .pipe( map( result => {
                        return result['data'];
                    }));
    */
   return this.http.get(`${this.URL}/users?per_page=6`)
                   .pipe( map( result => result['data']  ));
  }

  // 12.4.3
  getEmployeeById( id: string ) {

   return this.http.get(`${this.URL}/users/${ id }`)
                   .pipe( map( result => result['data']  ));
  }

}
