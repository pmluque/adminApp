import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryRefundComponent } from './entry-refund.component';

describe('EntryRefundComponent', () => {
  let component: EntryRefundComponent;
  let fixture: ComponentFixture<EntryRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
