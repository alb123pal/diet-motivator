import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangeDietComponent } from './arrange-diet.component';

describe('ArrangeDietComponent', () => {
  let component: ArrangeDietComponent;
  let fixture: ComponentFixture<ArrangeDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrangeDietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrangeDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
