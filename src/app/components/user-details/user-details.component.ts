import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../models/user-data.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userData = {
    name: 'Edward',
    surname: 'Ącki',
    weight: 80,
    height: 180,
    age: 24,
    gender: 'Mężczyzna',
    currentDiet: 'odchudzająca',
    demandKcal: 1800,
    BMI: 25
  }

  editableData = false;
  constructor() { }

  ngOnInit() {
  }

  editData() {
    this.editableData = !this.editableData;
  }

  saveData() {
    console.log('zapisz dane: ', this.userData);
  }
}
