import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserMealsService} from '../../services/user-meals.service';
import { UserMeal } from '../../models/user-meal.model';

@Component({
  selector: 'app-user-meals',
  templateUrl: './user-meals.component.html',
  styleUrls: ['./user-meals.component.scss']
})
export class UserMealsComponent implements OnInit {
  userMeals: UserMeal[];
  
  constructor(private _router: Router, private uMeals: UserMealsService) { }

  ngOnInit() {
    this.uMeals.getUserMeal().subscribe(data => {
      this.userMeals = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as UserMeal;
      })
    });
  }

  addMeal() {
    this._router.navigate(['dodaj-posilek']);
  }
}
