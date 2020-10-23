import { Component } from '@angular/core';

// 30
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminApp';

  // 30
  constructor( private authService: AuthService) {
    this.authService.initAuthListener();
  }
}
