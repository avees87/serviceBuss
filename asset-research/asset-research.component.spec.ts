import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetResearchComponent } from './asset-research.component';

describe('AssetResearchComponent', () => {
  let component: AssetResearchComponent;
  let fixture: ComponentFixture<AssetResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetResearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
