import { Component, OnInit } from '@angular/core';

// 25.b
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // 25.b
  constructor( private authService: AuthService , private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
        .then( () => {
           console.log('SidebarComponent.logout() = OK!');
           this.router.navigate(['/login']);
        })
        .catch( err => {
           console.log('SidebarComponent.logout() =' , err);
        });
  }

}
