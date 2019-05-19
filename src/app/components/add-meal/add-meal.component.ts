import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit {
  newMeal = {
    name: '',
    kcal: '',
    protein: '',
    carbo: '',
    fat: '',
    receipt: ''
  }
  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

  saveMeal() {
    console.log(this.newMeal);
    // Request do backendu

  }
}
