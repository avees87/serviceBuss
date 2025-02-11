import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayOffEstimateComponent } from './pay-off-estimate.component';

describe('PayOffEstimateComponent', () => {
  let component: PayOffEstimateComponent;
  let fixture: ComponentFixture<PayOffEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayOffEstimateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayOffEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
