import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { UserMeal } from '../../models/user-meal.model';
import { UserMealsService } from '../../services/user-meals.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit {
  selectedMeal: UserMeal;
  uMeal: UserMeal[];
  usersId: string;

  constructor(private _activatedRoute: ActivatedRoute, 
              private af: AngularFirestore, 
              private afa: AngularFireAuth,
              private umService: UserMealsService,
              private _router: Router) { 
    this.afa.user.subscribe(data => {
      this.usersId = data.uid;
    })
  }

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

  removeUserMeal(meal: string) {
    this.umService.deleteUserMeal(meal);
    this._router.navigate(['posilki']);
  }
}
