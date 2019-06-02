import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserMeal } from '../../models/user-meal.model';
import { UserMealsService } from '../../services/user-meals.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';


@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit {
  @Input('isRegister') isRegister: boolean;
  @Output('addedMeal') addedMeal = new EventEmitter<any>();

  mealIngredients: string;
  imageUploaded = false;
  newMeal: UserMeal = {
    id: '',
    userId: '',
    name: '',
    imageUrl: '',
    calories: 0,
    protein: 0,
    carbo: 0,
    fat: 0,
    ingredients: [],
    recipe: ''
  }

  constructor(private _http: HttpClient,
              private uMeal: UserMealsService,
              private db: AngularFireDatabase,
              private afa: AngularFireAuth
              ) { }

  ngOnInit() {
  }

  upload(event: any) {
    const file: File = event.target.files[0];
    const metaData = {'contentType': file.type};
    const storageRef = firebase.storage().ref('/photos/' +  file.name);
    storageRef.put(file, metaData).then(result => {
      storageRef.getDownloadURL().then(data => {
        console.log(data);
        this.newMeal.imageUrl = data;
        this.imageUploaded = true;
      })
    });
  }

  saveMeal() {
    this.imageUploaded = false;
    if (this.isRegister) {
      this.addedMeal.emit(this.newMeal);
      return ;
    }
    if(this.newMeal.imageUrl === "") {
      firebase.storage().ref('/photos/noimage.png').getDownloadURL().then(data => {
        this.newMeal.imageUrl = data;
      });
    }
    this.afa.user.subscribe(data => {
      this.newMeal.userId = data.uid;
    })
    const timeStamp = new Date();
    this.newMeal.id = this.newMeal.name + ':' + timeStamp.getTime();
    if(this.mealIngredients) {
      this.mealIngredients.split(',').forEach(item => {
        this.newMeal.ingredients.push(item);
      })
    }
    console.log(this.newMeal);
    // Request do backendu
    this.uMeal.createUserMeal(this.newMeal);
    
  }

}
