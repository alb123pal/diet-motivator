import { Component, OnInit } from '@angular/core';
import { Diet } from '../../models/diet.model';
import { Meal } from '../../models/meal.model';
import { DietService } from '../../services/diet.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-arrange-diet',
  templateUrl: './arrange-diet.component.html',
  styleUrls: ['./arrange-diet.component.scss']
})
export class ArrangeDietComponent implements OnInit {
  userMeals: Meal[] = [];
  mealIngredients: string;
  isAddingMeal = false;
  usersId: string;
  isAddedDiet = false;

  constructor(private dietService: DietService, private afa: AngularFireAuth) { }

  ngOnInit() {
    this.afa.user.subscribe(data => {
      this.usersId = data.uid;
    });
  }

  userDiet: Diet = {
    id: '',
    name: '',
    calories: 0,
    meals: [],
    userId: ''
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
    });
    this.userDiet.userId = this.usersId;
    console.log(this.userDiet);
    if(this.userDiet.name !== '' && this.userDiet.calories !== 0 &&
    this.userDiet.meals !== []) {
      this.create(this.userDiet);
    }
    this.isAddedDiet = true;
    setTimeout(() => {
      this.isAddedDiet = false;
    }, 3000);
    this.userMeals = [];
    this.userDiet = {
      id: '',
      name: '',
      calories: 0,
      meals: [],
      userId: ''
    };
  }

  create(diet: Diet) {
    this.dietService.createDiet(diet);
  }
}
