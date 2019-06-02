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
  bodySelector;
  constructor(private _router: Router, public userService: AuthorizeUserService) { }

  ngOnInit() {
    this.bodySelector = document.getElementsByTagName('body')[0];
    console.log(this.bodySelector);
  }

  navigateTo(route: string) {
    this._router.navigate([route]);
  }

  openAndCloseDropdown() {
    if (this.isOpen) {
      this.bodySelector.style.overflow = 'auto';
    } else {
      this.bodySelector.style.overflow = 'hidden';
    }
    this.isOpen = !this.isOpen;
  }

  logoutUser() {
    this.isOpen = !this.isOpen;
    this.userService.logout();
  }
}
