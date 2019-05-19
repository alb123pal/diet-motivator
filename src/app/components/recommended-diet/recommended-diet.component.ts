import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-recommended-diet',
  templateUrl: './recommended-diet.component.html',
  styleUrls: ['./recommended-diet.component.scss']
})
export class RecommendedDietComponent implements OnInit {

  rangeDietKcal = [
    '700-1000',
    '1000-1500',
    '1500-2000',
    '2000-2500',
    '2500-3000',
    '<3000',
  ]
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  showDetailsDiet(diet: string) {
    this._router.navigate(['szczegoly-diety', diet]);
  }

}
