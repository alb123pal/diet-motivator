import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit {
  @Input('isRegister') isRegister: boolean;
  @Output('addedMeal') addedMeal = new EventEmitter<any>();
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
    if(this.isRegister) {
      this.addedMeal.emit(this.newMeal);
    }
    // Request do backendu
  }
}
