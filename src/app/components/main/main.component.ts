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
  user = {
    name: '',
    surname: '',
    weight: 0,
    height: 0,
    BMI: 0,
    currentDiet: '',
    demandKcal: 0,
    friendNumber: '',
    totalDayKcal: 0
  };

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
    console.log(this.dailyRemainKcal);
    this.dailyMeals = JSON.parse(window.localStorage.getItem('meals')) || [];
    this.afa.user.subscribe(data => {
      this.af.collection('users', ref => ref.where('id', '==', data.uid)).snapshotChanges().subscribe(e => {
        this.user.friendNumber = e[0].payload.doc.get('friendNumber');
        this.user.name = e[0].payload.doc.get('name');
        this.user.surname = e[0].payload.doc.get('surname');
        this.user.weight = e[0].payload.doc.get('weight');
        this.user.height = e[0].payload.doc.get('height');
        this.user.BMI = e[0].payload.doc.get('BMI');
        this.user.demandKcal = e[0].payload.doc.get('demandKcal');
        this.user.currentDiet = e[0].payload.doc.get('currentDiet');
      });
    });
    this.countDailyKcal();
  }

  addMealToDailyKcal(meal) {
    // @ts-ignore
    this.dailyMeals.push(meal);
    window.localStorage.setItem('meals', JSON.stringify(this.dailyMeals));
    this.dailyMeals = JSON.parse(window.localStorage.getItem('meals'));
    this.countDailyKcal();
    if (this.dailyRemainKcal < 0) {
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

  countDailyKcal() {
    this.dailyAteKcal = 0;
    this.dailyRemainKcal = 0;
    for (let i = 0; i < this.dailyMeals.length; i++) {
      this.dailyAteKcal += +this.dailyMeals[i]['calories'];
    }
    this.dailyRemainKcal  = +this.user.demandKcal - this.dailyAteKcal;
  }

  sendMessageToFriend() {
    this.sms.send(this.user.friendNumber, 'Zjadłem za dużo kcal. Nie gotuj mi dziś obiadu.').then(() => {
      alert('Wiadomość została dostarczona');
    }).catch((error) => {
      alert('error:' + error);
    });
  }
}
