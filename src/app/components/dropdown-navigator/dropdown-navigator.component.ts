import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthorizeUserService } from '../../services/autorize-user.service';

@Component({
  selector: 'app-dropdown-navigator',
  templateUrl: './dropdown-navigator.component.html',
  styleUrls: ['./dropdown-navigator.component.scss']
})
export class DropdownNavigatorComponent implements OnInit {
  isOpen = false;
  constructor(private _router: Router, public userService: AuthorizeUserService) { }

  ngOnInit() {
  }

  navigateTo(route: string) {
    this._router.navigate([route]);
  }

  logoutUser() {
    this.isOpen = !this.isOpen;
    this.userService.logout();
  }
}
