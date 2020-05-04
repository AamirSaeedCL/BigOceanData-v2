import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VesselListComponent } from './vessel-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import VesselService from '../../services/vessel.service';
import { StateService } from 'src/app/services/state.service';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';

describe('VesselListComponent', () => {
  let component: VesselListComponent;
  let fixture: ComponentFixture<VesselListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ BrowserModule,  GoogleMapsModule],
      providers: [ VesselService, StateService]
    })
    .compileComponents().then(() =>{
        fixture = TestBed.createComponent(VesselListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
