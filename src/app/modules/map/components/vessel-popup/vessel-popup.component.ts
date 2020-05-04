import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Entity } from '../../models/entities/vessel';
import { StateService } from 'src/app/services/state.service';
import { VESSELSTATEENUM } from '../../models/enum/map-vessel-state.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vessel-popup',
  templateUrl: './vessel-popup.component.html',
  styleUrls: ['./vessel-popup.component.scss']
})

export class VesselPopupComponent implements OnInit, OnDestroy  {
  public selectedVessel: Entity.Vessel;
  // Ideally this funcationality should go to Base component.
  public unsubscribeOnComponentDestroy$: Subject<void> = new Subject();
  public unsubscribeOnComponentDestroyTakeUntil$ = takeUntil(this.unsubscribeOnComponentDestroy$);

  constructor(private stateService: StateService) { }

  ngOnInit() {
  // Listen for vessel state change signal.
  this.stateService.subscription()
    .pipe(this.unsubscribeOnComponentDestroyTakeUntil$)
    .subscribe((state) => {
      if (!!state[VESSELSTATEENUM.SelectedVessel]) {
        this.selectedVessel = state[VESSELSTATEENUM.SelectedVessel];
        console.log('Selected Vessel', state[VESSELSTATEENUM.SelectedVessel]);
      }
    });
 }

 ngOnDestroy(): void {
  this.unsubscribeOnComponentDestroy$.next();
  this.unsubscribeOnComponentDestroy$.complete();
  }
}
