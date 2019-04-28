import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedDietComponent } from './recommended-diet.component';

describe('RecommendedDietComponent', () => {
  let component: RecommendedDietComponent;
  let fixture: ComponentFixture<RecommendedDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedDietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
