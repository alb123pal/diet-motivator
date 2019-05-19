import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDietComponent } from './details-diet.component';

describe('DetailsDietComponent', () => {
  let component: DetailsDietComponent;
  let fixture: ComponentFixture<DetailsDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
