import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Entity } from '../../models/entities/vessel';
import VesselService from '../../services/vessel.service';
import { StateService } from 'src/app/services/state.service';
import { VESSELSTATEENUM } from '../../models/enum/map-vessel-state.enum';
import { GoogleMap } from '@angular/google-maps';
import { shareReplay, takeUntil, map, tap } from 'rxjs/operators';
import { Subject, from } from 'rxjs';
import LocalStorageService from 'src/app/modules/map/services/local-storage.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  public vessels: Entity.Vessel[] = [];
  public selectedVessel: Entity.Vessel;
  public defaultZoom = 3;
  public defaultCenter: google.maps.LatLngLiteral;
  public defaultOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 1,
  };
  @ViewChild(GoogleMap, { static: false }) private map: GoogleMap;

  // Ideally this funcationality should go to Base component.
  public unsubscribeOnComponentDestroy$: Subject<void> = new Subject();
  public unsubscribeOnComponentDestroyTakeUntil$ = takeUntil(this.unsubscribeOnComponentDestroy$);

  constructor(private vesselService: VesselService,
              private stateService: StateService,
              private storage: LocalStorageService,) { }

  ngOnInit() {
    this.getVesselList();
    this.listenForSignal();
    this.setMapCenterPosition();
}

  public selectVessel(vessel: Entity.Vessel) {
    this.selectedVessel = vessel;
    this.stateService.signal({ [VESSELSTATEENUM.SelectedVessel]: vessel });
  }

  private getVesselList(): void {
    this.vesselService.getActiveVessel().pipe(
      this.unsubscribeOnComponentDestroyTakeUntil$,
      shareReplay(3)).subscribe((v: Entity.Vessel[]) => {
        this.vessels = v;
    });
  }

  private listenForSignal(): void {
    // Listen for vessel state change signal.
    this.stateService.subscription().subscribe((state) => {
      if (!!state[VESSELSTATEENUM.VesselPan]) {
          this.selectedVessel = state[VESSELSTATEENUM.VesselPan];
          console.log('VesselPan Vessel', state[VESSELSTATEENUM.VesselPan]);
          const latLng = new google.maps.LatLng(this.selectedVessel.position.lat, this.selectedVessel.position.lng);
          this.map.panTo(latLng);
          this.map.zoom = 6;
        } else if (!!state[VESSELSTATEENUM.StatusChanged]) {
          this.selectedVessel = state[VESSELSTATEENUM.VesselPan];
          console.log('Status Changed', state[VESSELSTATEENUM.VesselPan]);
          this.getVesselList();
        }
    });
  }

  private setMapCenterPosition(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.defaultCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeOnComponentDestroy$.next();
    this.unsubscribeOnComponentDestroy$.complete();
  }
}
