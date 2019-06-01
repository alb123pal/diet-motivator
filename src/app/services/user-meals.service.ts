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

  updateUserMeal(meal: UserMeal) {
    delete meal.id;
    this.firestore.doc('meals/' + meal.id).update(meal);
  }

  deleteUserMeal(mealName: string) {
    this.firestore.collection('meals', ref => ref.where('id', '==', mealName)).snapshotChanges().subscribe(e => {
      this.firestore.collection("meals").doc(e[0].payload.doc.id).delete();
    })
  }
}
