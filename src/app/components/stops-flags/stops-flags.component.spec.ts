import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsFlagsComponent } from './stops-flags.component';

describe('StopsFlagsComponent', () => {
  let component: StopsFlagsComponent;
  let fixture: ComponentFixture<StopsFlagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopsFlagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopsFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
