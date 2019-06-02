import { Component, OnInit } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { UserInfo } from '../../models/user-data.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user;
  userData: UserInfo;
  addedMeals = [];
  dailyMeals: [];
  dailyAteKcal = 0;
  dailyRemainKcal = 0;
  constructor(private sms: SMS, 
              private androidPermissions: AndroidPermissions,
              private afa: AngularFireAuth,
              private af: AngularFirestore ) { }

  ngOnInit() {
    this.afa.user.subscribe(data => {
      this.af.collection('users', ref => ref.where("id", '==', data.uid))
      .snapshotChanges()
      .subscribe(data => {
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
          userToken: localStorage.getItem("userToken"),
          friendNumber: data[0].payload.doc.get('friendNumber')
        }
        this.af.collection("users").doc(data[0].payload.doc.id).set(this.userData, {merge: true});
      })
    })
    this.dailyMeals = JSON.parse(window.localStorage.getItem('meals')) || [];
    console.log(this.dailyMeals);
    this.user = {
      weight: 80,
      height: 182,
      currentDiet: 'dieta niskokaloryczna',
      purpose: 78,
      totalDayKcal: 2000,
      ateKcal: 1200,
      remainKcal: 800,
      exercise: 200,
      meal1: 'omlet',
      meal2: 'owsianka',
      meal3: 'twaróg',
      meal4: ''
    }
    this.countDailyKcal();
  }

  addMealToDailyKcal(meal) {
    // @ts-ignore
    this.dailyMeals.push(meal);
    window.localStorage.setItem('meals', JSON.stringify(this.dailyMeals));
    this.dailyMeals = JSON.parse(window.localStorage.getItem('meals'));
    this.countDailyKcal();
  }

  countDailyKcal() {
    this.dailyAteKcal = 0;
    this.dailyRemainKcal = 0;
    for (let i = 0; i < this.dailyMeals.length; i++) {
      this.dailyAteKcal += +this.dailyMeals[i]['calories'];
    }
    this.dailyRemainKcal  = +this.user.totalDayKcal - this.dailyAteKcal;

    if (this.dailyRemainKcal < 10) {
      alert('przekroczono limt kcal, wysyłam wiadomosc');
      this.androidPermissions.requestPermissions(
          [this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

      this.androidPermissions.requestPermission(
          this.androidPermissions.PERMISSION.SEND_SMS).then(
          success => {
            this.sendMessageToFriend();
          });
    }
  }

  sendMessageToFriend() {
    this.sms.send('662793549', 'Zjadłem za dużo kcal').then(() => {
      alert('Wiadomość została dostarczona');
    }).catch((error) => {
      alert('error:' + error);
    });
  }
}
