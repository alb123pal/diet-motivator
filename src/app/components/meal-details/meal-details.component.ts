import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { UserMeal } from '../../models/user-meal.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit {
  selectedMeal: UserMeal;
  uMeal: UserMeal[];

  constructor(private _activatedRoute: ActivatedRoute, private af: AngularFirestore) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(meal => {
      this.selectedMeal = meal['params'].mealId;
    });

    const query = this.af.collection('meals', ref => ref.where('id', '==', this.selectedMeal)).snapshotChanges();
    query.subscribe(data => {
      this.uMeal = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as UserMeal;
      })
    })
  }
}
