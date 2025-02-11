import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDisplayComponent } from './loan-display.component';

describe('LoanDisplayComponent', () => {
  let component: LoanDisplayComponent;
  let fixture: ComponentFixture<LoanDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
