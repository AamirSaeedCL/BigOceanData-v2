import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { SelectedVesselComponent } from './components/selected-vessel/selected-vessel.component';
import { VesselListComponent } from './components/vessel-list/vessel-list.component';
import { VesselPopupComponent } from './components/vessel-popup/vessel-popup.component';
import { GoogleMapsModule } from '@angular/google-maps'
import VesselService from './services/vessel.service';
import { StateService } from 'src/app/services/state.service';
import LocalStorageService, { LOCAL_STORAGE_SERVICE } from './services/local-storage.service';
import { LOCAL_STORAGE } from 'ngx-webstorage-service';

const COMPONENTS = [
  MapComponent,
  SelectedVesselComponent,
  VesselListComponent,
  VesselPopupComponent
];

const SERVICES = [
  LocalStorageService,
  VesselService,
  StateService
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule
   ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
    { provide: LOCAL_STORAGE_SERVICE, useExisting: LOCAL_STORAGE },
    ...SERVICES
  ]
})

export class MapModule { }
