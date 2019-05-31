import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserMeal } from '../models/user-meal.model';

@Injectable({
  providedIn: 'root'
})

export class UserMealsService {

  constructor(private firestore: AngularFirestore) { }

  getUserMeal() {
    return this.firestore.collection('meals').snapshotChanges();
  }

  createUserMeal(meal: UserMeal) {
    return this.firestore.collection('meals').add(meal);
  }

  updateDiet(meal: UserMeal) {
    delete meal.id;
    this.firestore.doc('meals/' + meal.id).update(meal);
  }

  deleteDiet(mealName: string) {
    this.firestore.doc('meals/' + mealName).delete();
  }
}
