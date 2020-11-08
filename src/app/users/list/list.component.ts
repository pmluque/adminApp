import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employees: Employee[] = [];

  constructor( private empService: EmployeeService) { }

  ngOnInit(): void {
    this.empService.getEmployee()
                   .subscribe( data => {
                       console.log('ListComponent=', data);
                       this.employees = data;
                    } );

  }

}
