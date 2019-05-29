import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserInfo } from '../../models/user-data.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-calculator-bmi',
  templateUrl: './calculator-bmi.component.html',
  styleUrls: ['./calculator-bmi.component.scss']
})
export class CalculatorBmiComponent implements OnInit {
  @ViewChild('weight') weight: ElementRef;
  @ViewChild('height') height: ElementRef;
  @ViewChild('age') age: ElementRef;

  gender: string;
  BMI: number
  indicatorBMI: string;
  kcalDemand: number;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit() {
  }

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
  }

  updateUserData() {
    this.afAuth.authState.subscribe(data => {
      this.db.collection('users', ref => ref.where('id', '==', data.uid)).snapshotChanges().subscribe(e => {
        if(e.length === 0) {
          alert("Przed zapisaniem danych utworz dane w sekcji dane uzytkownika");
        } else {
          this.userData = {
            id: e[0].payload.doc.get('id'),
            name: e[0].payload.doc.get('name'),
            surname: e[0].payload.doc.get('surname'),
            gender: e[0].payload.doc.get('gender'),
            weight: e[0].payload.doc.get('weight'),
            height: e[0].payload.doc.get('height'),
            age: e[0].payload.doc.get('age'),
            BMI: this.BMI,
            currentDiet: e[0].payload.doc.get('currentDiet'),
            demandKcal:  this.kcalDemand,
          }
          console.log(this.userData);
          this.db.collection("users").doc(e[0].payload.doc.id).set(this.userData, {merge: true})
        }
      });
    })
  }

  setBMI() {
    const weightValue = this.weight.nativeElement.value;
    const heightValue = this.height.nativeElement.value;
    
    const heightValueInCentimeter = this.convertCentimeterToMeter(heightValue);

    this.BMI = weightValue / (heightValueInCentimeter * heightValueInCentimeter);

    this.determineMeaningBMI(this.BMI);
    this.setKcalDemand(weightValue, heightValue);
  }

  setKcalDemand(weight: number, height: number) {
    const ageValue = this.age.nativeElement.value;
    if ( this.gender === "M" ) {
      this.kcalDemand = (9.99 * weight) + (6.25 * height) - (4.92 * ageValue) + 5;
    } else if ( this.gender === "K" ) {
      this.kcalDemand = (9.99 * weight) + (6.25 * height) - (4.92 * ageValue) - 161;
    }
  }

  convertCentimeterToMeter(height: number) {
    const heightValue = height.toString();
    const heightValueInCentimeter = heightValue.substring(0, 1) + '.' + heightValue.substring(1);

    return +heightValueInCentimeter;
  }

  determineMeaningBMI(BMI: number) {
    if ( BMI < 18.5 ) {
      this.indicatorBMI = 'niedowaga';
    } else if ( BMI < 24.9 ) {
      this.indicatorBMI = 'waga prawidłowa';
    } else if ( BMI < 29.9 ) {
      this.indicatorBMI = 'nadwaga';
    } else {
      this.indicatorBMI = 'otyłość';
    }
  }
}
