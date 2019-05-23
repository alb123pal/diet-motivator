import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrange-diet',
  templateUrl: './arrange-diet.component.html',
  styleUrls: ['./arrange-diet.component.scss']
})
export class ArrangeDietComponent implements OnInit {
  addingMeal = {
  };
  userMeals = [];
  isAddingMeal = false;

  constructor() { }

  ngOnInit() {
  }

  addMeal() {
    this.isAddingMeal = !this.isAddingMeal;
  }

  saveMeal() {
    this.userMeals.push(this.addingMeal);
    this.isAddingMeal = false;
    this.addingMeal = {};
    console.log(this.userMeals);
  }

  saveAllMeals() {
    console.log('Zapisujemy dane do firebase');
  }
}
