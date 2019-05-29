import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInfo } from '../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private firestore: AngularFirestore) { }

  getUserData() {
    return this.firestore.collection('users').snapshotChanges();
  }

  createUserData(userData: UserInfo) {
    return this.firestore.collection('users').add(userData);
  }

  updateUserData(uData: UserInfo) {
    delete uData.id;
    this.firestore.doc('users/' + uData.id).update(uData);
  }
}
