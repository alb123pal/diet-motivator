import { Component } from '@angular/core';
import { AuthorizeUserService } from './services/autorize-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'diet-motivator';

  constructor(public userService: AuthorizeUserService) {
    
  }
}
