import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../models/user-data.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  uInfo:  UserInfo;
  userId: string;  

  userData: UserInfo = {
    id: '',
    name: '',
    surname: '',
    weight: 0,
    height: 0,
    age: 0,
    gender: '',
    currentDiet: '',
    demandKcal: 0,
    BMI: 0,
    userToken: '',
    friendNumber: ''
  };

  editableData = false;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private uService: UserDataService) { }

  ngOnInit() {
    // this.getCurrentUser();
    this.afAuth.authState.subscribe(data => {
      console.log(data.uid);
      this.db.collection('users', ref => ref.where('id', '==', data.uid)).snapshotChanges().subscribe(data => {
        if (data.length === 0) {
          console.log('Dane nie istnieja');
        } else {
          this.userData = {
            id: data[0].payload.doc.get('id'),
            name: data[0].payload.doc.get('name'),
            surname: data[0].payload.doc.get('surname'),
            gender: data[0].payload.doc.get('gender'),
            weight: data[0].payload.doc.get('weight'),
            height: data[0].payload.doc.get('height'),
            age: data[0].payload.doc.get('age'),
            BMI: data[0].payload.doc.get('BMI'),
            currentDiet: data[0].payload.doc.get('currentDiet'),
            demandKcal:  data[0].payload.doc.get('demandKcal'),
            userToken: data[0].payload.doc.get('userToken'),
            friendNumber: data[0].payload.doc.get('friendNumber'),
          };
        }
      });
    });
  }

  editData() {
    this.editableData = !this.editableData;
  }

  saveData() {
    // this.userData.BMI = this.calculateBMI();
    this.afAuth.authState.subscribe(data => {
      this.db.collection('users', ref => ref.where('id', '==', data.uid)).snapshotChanges().subscribe(e => {
        if(e.length === 0) {
          this.uService.createUserData(this.userData);
        } else {
          this.db.collection("users").doc(e[0].payload.doc.id).set(this.userData, {merge: true});
        }
      });
    });
  }

  // getCurrentUser() {
  //   this.afAuth.authState.subscribe((data) => {
  //     this.userData.id = data.uid;
  //   })
  // }

  // calculateBMI() {
  //   let uw = this.userData.weight;
  //   let uh = this.userData.height;
  //   console.log(uw, uh);
  //   if(uw === 0 || uh === 0) {
  //     return 0;
  //   } else {
  //     return uw/(uh*uh);
  //   }
  // }
}
