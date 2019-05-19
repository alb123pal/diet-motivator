import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-meals',
  templateUrl: './user-meals.component.html',
  styleUrls: ['./user-meals.component.scss']
})
export class UserMealsComponent implements OnInit {
  userMeals = [
    {
      name: 'kotlet',
      kcal: 1500,
      proteins: 22,
      carbo: 34,
      fat: 50
    },
    {
      name: 'pierogi',
      kcal: 1500,
      proteins: 22,
      carbo: 34,
      fat: 50
    },
    {
      name: 'pizza',
      kcal: 1500,
      proteins: 22,
      carbo: 34,
      fat: 50
    },
    {
      name: 'twarog',
      kcal: 1500,
      proteins: 22,
      carbo: 34,
      fat: 50
    }
  ];
  
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  addMeal() {
    this._router.navigate(['dodaj-posilek']);
  }
}
