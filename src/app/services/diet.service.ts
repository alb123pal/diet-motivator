import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Diet } from '../models/diet.model';

@Injectable({
  providedIn: 'root'
})

export class DietService {

  constructor(private firestore: AngularFirestore) { }

  getDiet() {
    return this.firestore.collection('diets').snapshotChanges();
  }

  createDiet(diet: Diet) {
    return this.firestore.collection('diets').add(diet);
  }

  updateDiet(diet: Diet) {
    delete diet.id;
    this.firestore.doc('diets/' + diet.id).update(diet);
  }

  deleteDiet(dietId: string) {
    this.firestore.collection('diets', ref => ref.where('id', '==', dietId)).snapshotChanges().subscribe(e => {
      this.firestore.collection("diets").doc(e[0].payload.doc.id).delete();
    })
  }

  getDatabase() {
    return this.firestore;
  }
}
