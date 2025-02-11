import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCBKLossMitComponent } from './fcbkloss-mit.component';

describe('FCBKLossMitComponent', () => {
  let component: FCBKLossMitComponent;
  let fixture: ComponentFixture<FCBKLossMitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FCBKLossMitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FCBKLossMitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
