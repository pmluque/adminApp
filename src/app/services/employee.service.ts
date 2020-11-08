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
  getEmployee() {
    /*
    return this.http.get(`${this.URL}/users?per_page=6`)
                    .pipe( map( result => {
                        return result['data'];
                    }));
    */
   return this.http.get(`${this.URL}/users?per_page=6`)
                   .pipe( map( result => result['data']  ));
  }
}
