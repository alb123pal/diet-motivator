import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMealsComponent } from './user-meals.component';

describe('UserMealsComponent', () => {
  let component: UserMealsComponent;
  let fixture: ComponentFixture<UserMealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
