import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateWithMember } from '../../store/reducer/employee.reducer';
import * as member from '../../store/actions/employee.actions';
import { Employee } from '../../models/employee.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit , OnDestroy {

  employee: Employee;
  employeeSubscription: Subscription;

  constructor( private router: ActivatedRoute , private store: Store<AppStateWithMember>) { }

  ngOnInit(): void {

    // 12.5.16
    this.employeeSubscription = this.store.select('member').subscribe( ({ employee }) => {
      console.log('EmployeeComponent - member.employee=' , employee );
      // recoger en propiedades
      this.employee = employee;

    });


    // 12.5.15
    this.router.params.subscribe( ({id}) => {
      console.log('EmployeeComponent - params=' , id);
      // Crear en el servicio , el servicio para traer ficha de un usuario
      this.store.dispatch( member.loadEmployee( {id} ) );
    });

  }

  ngOnDestroy(): void {
    this.employeeSubscription.unsubscribe();
  }

}
