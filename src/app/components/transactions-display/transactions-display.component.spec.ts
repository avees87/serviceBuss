import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsDisplayComponent } from './transactions-display.component';

describe('TransactionsDisplayComponent', () => {
  let component: TransactionsDisplayComponent;
  let fixture: ComponentFixture<TransactionsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
