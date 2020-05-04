import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedVesselComponent } from './selected-vessel.component';

describe('SelectedVesselComponent', () => {
  let component: SelectedVesselComponent;
  let fixture: ComponentFixture<SelectedVesselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedVesselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedVesselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
