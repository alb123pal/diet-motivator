import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorBmiComponent } from './calculator-bmi.component';

describe('CalculatorBmiComponent', () => {
  let component: CalculatorBmiComponent;
  let fixture: ComponentFixture<CalculatorBmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorBmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorBmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
