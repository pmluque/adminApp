import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

// 9.11.1
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
// 9.11.2
import { Transaction } from '../../models/transaction.model';
// 9.12.3
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

// 9.11.2 - propiedades
ingressCount = 0;
expenseCount = 0;

ingressTotal = 0.0;
expenseTotal = 0.0;

// 9.12.3 propiedades del gráfico
// Doughnut
public doughnutChartLabels: Label[] = [ 'Gastos' , 'Ingresos']; // 2 series
public doughnutChartData: MultiDataSet = []; // sin data
public doughnutChartType: ChartType = 'doughnut';

  // 9.11.1
  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('items')
              .subscribe( ({ items }) => this.calcStats( items )  );
  }

  calcStats( items: Transaction[] ) {

    this.ingressCount = 0;
    this.expenseCount = 0;
    this.ingressTotal = 0.0;
    this.expenseTotal = 0.0;

    for ( const item of items ) {
         if ( item.type === 'I' ) {
           this.ingressTotal += parseFloat(item.amount);
           this.ingressCount++;
         } else {
           this.expenseTotal += parseFloat(item.amount);
           this.expenseCount++;
         }
     }

    // 9.12.3
    this.doughnutChartData = [ [ this.expenseTotal , this.ingressTotal] ];
  }

}
