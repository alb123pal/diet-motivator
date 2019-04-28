import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownNavigatorComponent } from './dropdown-navigator.component';

describe('DropdownNavigatorComponent', () => {
  let component: DropdownNavigatorComponent;
  let fixture: ComponentFixture<DropdownNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
