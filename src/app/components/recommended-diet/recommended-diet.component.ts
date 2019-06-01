import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DietService } from '../../services/diet.service';
import { Diet } from '../../models/diet.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-recommended-diet',
  templateUrl: './recommended-diet.component.html',
  styleUrls: ['./recommended-diet.component.scss']
})

export class RecommendedDietComponent implements OnInit {

  diets: Diet[];
  queryValue: string;
  selectedDiet: string;
  usersId: string;

  rangeDietKcal = [];
  
  constructor(private _router: Router, private dietService: DietService, private afa: AngularFireAuth) { }

  ngOnInit() {
    this.afa.user.subscribe(data => {
      this.usersId = data.uid;
    })

    this.dietService.getDatabase().collection('diets').snapshotChanges().subscribe(data => {
      data.forEach(e => {
        let calR = e.payload.doc.get('calories');
        if(!this.rangeDietKcal.includes(calR)) {
          this.rangeDietKcal.push(calR);
        }
      })
    })

    this.dietService.getDiet().subscribe(data => {
      this.diets = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Diet;
      })
    });
  }

  create(diet: Diet) {
    this.dietService.createDiet(diet);
  }

  update(diet: Diet) {
    this.dietService.updateDiet(diet);
  }

  delete(id: string) {
    this.dietService.deleteDiet(id);
  }

  getDietDetails(dietName: string): void {
    this._router.navigate(['szczegoly-diety', dietName]);
    // console.log(dietName);
  }

  chooseDietRange(event: any) {
    this.queryValue = event.target.value;
    let query = this.dietService.getDatabase().collection('diets', ref => ref.where('calories', '==', +this.queryValue)).snapshotChanges();
    
    if(this.queryValue === "Wszystko") {
      this.dietService.getDiet().subscribe(data => {
        this.diets = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Diet;
        })
      })
    } else if(this.queryValue === "Uzytkownika") {
      query = this.dietService.getDatabase().collection('diets', ref => ref.where('userId', '==', this.usersId)).snapshotChanges();
      query.subscribe(data => {
        this.diets = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Diet;
        })
      })
    } else {
      query.subscribe(data => {
        this.diets = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Diet;
        })
      })
    }
  }

  // showDetailsDiet(diet: string) {
  //   this._router.navigate(['szczegoly-diety', diet]);
  // }

}

// export class RecommendedDietComponent implements OnInit {

//   rangeDietKcal = [
//     '700-1000',
//     '1000-1500',
//     '1500-2000',
//     '2000-2500',
//     '2500-3000',
//     '<3000',
//   ]

//   constructor(private _router: Router) { }

//   ngOnInit() {
//   }

//   showDetailsDiet(diet: string) {
//     this._router.navigate(['szczegoly-diety', diet]);
//   }

// }
