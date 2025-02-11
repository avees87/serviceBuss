import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerInfoDisplayComponent } from './borrower-info-display.component';

describe('BorrowerInfoDisplayComponent', () => {
  let component: BorrowerInfoDisplayComponent;
  let fixture: ComponentFixture<BorrowerInfoDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowerInfoDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowerInfoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
