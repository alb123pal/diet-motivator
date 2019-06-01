import { Component, OnInit } from '@angular/core';
import { Diet } from '../../models/diet.model';
import { Meal } from '../../models/meal.model';
import { DietService } from '../../services/diet.service';

@Component({
  selector: 'app-arrange-diet',
  templateUrl: './arrange-diet.component.html',
  styleUrls: ['./arrange-diet.component.scss']
})
export class ArrangeDietComponent implements OnInit {
  userMeals: Meal[] = [];
  mealIngredients: string;
  mealsCalories: number;
  isAddingMeal = false;

  constructor(private dietService: DietService) { }

  ngOnInit() {
  }

  userDiet: Diet = {
    id: '',
    name: '',
    calories: 0,
    meals: []
  };

  addingMeal: Meal = {
    name: '',
    type: '',
    calories: 0,
    ingredients: [],
    recipe: ''
  };

  addMeal() {
    this.isAddingMeal = !this.isAddingMeal;
  }

  saveMeal() {
    this.mealIngredients.split(',').forEach(ing => {
      this.addingMeal.ingredients.push(ing);
    });
    this.userMeals.push(this.addingMeal);
    this.isAddingMeal = false;
    this.mealIngredients = '';
    this.addingMeal = {
      name: '',
      type: '',
      calories: 0,
      ingredients: [],
      recipe: ''
    };
    console.log(this.userMeals);
  }

  saveAllMeals() {
    let now = new Date();
    this.userDiet.id = this.userDiet.name + ":" + now.getTime();
    this.userDiet.meals = this.userMeals;
    this.userMeals.forEach(meal => {
      this.userDiet.calories += meal.calories;
    })
    console.log("liczba kalori: " + this.mealsCalories + typeof(this.mealsCalories));
    console.log(this.userDiet);
    this.create(this.userDiet);
    this.userMeals = [];
    this.userDiet = {
      id: '',
      name: '',
      calories: 0,
      meals: []
    };
  }

  create(diet: Diet) {
    this.dietService.createDiet(diet);
  }
}
