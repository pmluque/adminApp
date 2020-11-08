import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavfinderComponent } from './navfinder.component';

describe('NavfinderComponent', () => {
  let component: NavfinderComponent;
  let fixture: ComponentFixture<NavfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
