import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user;
  constructor() { }

  ngOnInit() {
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
  }
}
