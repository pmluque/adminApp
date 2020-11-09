import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navfinder',
  templateUrl: './navfinder.component.html',
  styleUrls: ['./navfinder.component.css']
})
export class NavfinderComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  // Acción de la caja buscar
  actionSearch( id: string ) {
    console.log('NavfinderComponent.actionSearch' , id);
    if ( id === null ) { return; }

    this.router.navigate(['/employee', id ]);
  }

}
