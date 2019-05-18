import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
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
