import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Diet } from '../../models/diet.model';
import { DietService } from '../../services/diet.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router} from '@angular/router';

@Component({
  selector: 'app-details-diet',
  templateUrl: './details-diet.component.html',
  styleUrls: ['./details-diet.component.scss']
})

export class DetailsDietComponent implements OnInit {
  dietName: string;
  selectedDiet: Diet[];
  usersId: string;

  constructor(private _activatedRoute: ActivatedRoute, 
              private dietService: DietService, 
              private afa: AngularFireAuth,
              private _router: Router) { }

  ngOnInit() {
    this.afa.user.subscribe(data => {
      this.usersId = data.uid;
    })

    this._activatedRoute.paramMap.subscribe(dietName => {
      this.dietName = dietName['params'].dietName;
    });

    let query = this.dietService.getDatabase().collection('diets', ref => ref.where('name', '==', this.dietName)).snapshotChanges();
    query.subscribe(data => {
      this.selectedDiet = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Diet;
      })
    })
  }

  removeDiet(diet: string) {
    console.log(diet);
    this.dietService.deleteDiet(diet);
    this._router.navigate(['rekomendowane-diety']);
  }

}

// export class DetailsDietComponent implements OnInit {
//   rangeDiet: string;
//   meals = [
//     {
//       name: 'kotlet',
//       kcal: 1500,
//       proteins: 22,
//       carbo: 34,
//       fat: 50
//     },
//     {
//       name: 'pierogi',
//       kcal: 1500,
//       proteins: 22,
//       carbo: 34,
//       fat: 50
//     },
//     {
//       name: 'pizza',
//       kcal: 1500,
//       proteins: 22,
//       carbo: 34,
//       fat: 50
//     },
//     {
//       name: 'twarog',
//       kcal: 1500,
//       proteins: 22,
//       carbo: 34,
//       fat: 50
//     }
//   ];

//   constructor(private _activatedRoute: ActivatedRoute, private _http: HttpClient) { }

//   ngOnInit() {
//     this._activatedRoute.paramMap.subscribe((rangeDiet) => {
//       this.rangeDiet = rangeDiet['params'].diet;
//       // Tutaj wykonać request do backendu w celu odebrania konkretnych diet z zakresu
//       console.log(this.rangeDiet);
//     });
//   }

// }
