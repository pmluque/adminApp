import { Pipe, PipeTransform } from '@angular/core';
// 9.10.1
import { Transaction } from '../models/transaction.model';
/*
@Pipe({
  name: 'transactionOrder'
})
export class TransactionOrderPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

Uso de sort: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/sort
*/
@Pipe({
  name: 'transactionOrder'
})
export class TransactionOrderPipe implements PipeTransform {

  transform( items: Transaction[] ): Transaction[] {
    console.log('TransactionOrderPipe items=' , items );
    return items.slice().sort( (a, b) => {
      if ( a.type === 'I') {
        return -1;
      } else {
        return 1;
      }

    });
  }

}
