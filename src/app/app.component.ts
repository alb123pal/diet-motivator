import { Component, OnInit } from '@angular/core';
import { AuthorizeUserService } from './services/autorize-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'diet-motivator';
  isLogged = false;

  constructor(public userService: AuthorizeUserService) {
    
  }

  ngOnInit() {
    this.userService.isAuthorize$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }
}
