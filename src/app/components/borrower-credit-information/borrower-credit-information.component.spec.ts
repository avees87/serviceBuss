import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerCreditInformationComponent } from './borrower-credit-information.component';

describe('BorrowerCreditInformationComponent', () => {
  let component: BorrowerCreditInformationComponent;
  let fixture: ComponentFixture<BorrowerCreditInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowerCreditInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowerCreditInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
