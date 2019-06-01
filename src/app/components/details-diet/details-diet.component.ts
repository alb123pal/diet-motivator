import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Diet } from '../../models/diet.model';
import { DietService } from '../../services/diet.service';

@Component({
  selector: 'app-details-diet',
  templateUrl: './details-diet.component.html',
  styleUrls: ['./details-diet.component.scss']
})

export class DetailsDietComponent implements OnInit {
  dietName: string;
  selectedDiet: Diet[];

  constructor(private _activatedRoute: ActivatedRoute, private dietService: DietService) { }

  ngOnInit() {
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
