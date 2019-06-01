import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dropdown-navigator',
  templateUrl: './dropdown-navigator.component.html',
  styleUrls: ['./dropdown-navigator.component.scss']
})
export class DropdownNavigatorComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  navigateTo(route: string) {
    this._router.navigate([route]);
  }
}
