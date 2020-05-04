import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import VesselService from '../../services/vessel.service';
import { Entity } from '../../models/entities/vessel';
import { StateService } from 'src/app/services/state.service';
import { VESSELSTATEENUM } from '../../models/enum/map-vessel-state.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import LocalStorageService from 'src/app/modules/map/services/local-storage.service';

@Component({
  selector: 'vessel-list',
  templateUrl: './vessel-list.component.html',
  styleUrls: ['./vessel-list.component.scss']
})

export class VesselListComponent implements OnInit, OnDestroy  {
  @Input() selectedVessel: Entity.Vessel;
  public vessels: Entity.Vessel[] = [];
  // Ideally this funcationality should go to Base component.
  public unsubscribeOnComponentDestroy$: Subject<void> = new Subject();
  public unsubscribeOnComponentDestroyTakeUntil$ = takeUntil(this.unsubscribeOnComponentDestroy$);

  constructor(private vesselService: VesselService,
              private stateService: StateService,
              private storage: LocalStorageService) { }

  ngOnInit() {
    this.vesselService.getAllVessel()
      .pipe(this.unsubscribeOnComponentDestroyTakeUntil$)
      .subscribe((v: Entity.Vessel[]) => {
      this.vessels = [...v];
      this.updateDisplayStatus();
    });
  }

  showVessel(v: Entity.Vessel): void {
    console.log(v);
    this.stateService.signal({ [VESSELSTATEENUM.VesselPan]: v });
  }

  checkStatus(vessel: Entity.Vessel): void {
      vessel.display = !vessel.display;
      // save the current vessel in localstorage.
      this.storage.setKey(vessel.name, vessel);
      this.stateService.signal({ [VESSELSTATEENUM.StatusChanged]: vessel });
  }

  private updateDisplayStatus(): void {
    this.vessels.forEach(v => {
      const storagedVessel = this.storage.getKey(v.name);
      if (storagedVessel !== undefined) {
        v.display = storagedVessel.display;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeOnComponentDestroy$.next();
    this.unsubscribeOnComponentDestroy$.complete();
  }
}
