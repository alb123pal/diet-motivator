import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-diet',
  templateUrl: './details-diet.component.html',
  styleUrls: ['./details-diet.component.scss']
})
export class DetailsDietComponent implements OnInit {
  rangeDiet: string;
  meals = [
    {
      name: 'kotlet',
      kcal: 1500,
      proteins: 22,
      carbo: 34,
      fat: 50
    },
    {
      name: 'pierogi',
      kcal: 1500,
      proteins: 22,
      carbo: 34,
      fat: 50
    },
    {
      name: 'pizza',
      kcal: 1500,
      proteins: 22,
      carbo: 34,
      fat: 50
    },
    {
      name: 'twarog',
      kcal: 1500,
      proteins: 22,
      carbo: 34,
      fat: 50
    }
  ];

  constructor(private _activatedRoute: ActivatedRoute, private _http: HttpClient) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((rangeDiet) => {
      this.rangeDiet = rangeDiet['params'].diet;
      // Tutaj wykonać request do backendu w celu odebrania konkretnych diet z zakresu
      console.log(this.rangeDiet);
    });
  }

}
