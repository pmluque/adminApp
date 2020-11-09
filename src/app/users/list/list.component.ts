import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { AppStateWithTeam } from '../../store/reducer/employees.reducer';
import { Store } from '@ngrx/store';
import { loadEmployees } from '../../store/actions/employees.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employees: Employee[] = [];
  loading: boolean = false;
  error: any;

  /* 2.0.1
  constructor( private empService: EmployeeService) { }

  ngOnInit(): void {
    this.empService.getEmployee()
                   .subscribe( data => {
                       console.log('ListComponent=', data);
                       this.employees = data;
                    } );

  }
  */

  // v.2.0.2 |  12.5.6 | 12.5.9
  constructor( private store: Store<AppStateWithTeam>) { }

  ngOnInit(): void {

    this.store.select('team').subscribe( ({employees, loading, error}) => {
        this.employees = employees;
        this.loading = loading;
        this.error = error;
    });

    this.store.dispatch( loadEmployees() );
  }

}
