import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDailogComponent } from './mat-dailog.component';

describe('MatDailogComponent', () => {
  let component: MatDailogComponent;
  let fixture: ComponentFixture<MatDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatDailogComponent]
    });
    fixture = TestBed.createComponent(MatDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
