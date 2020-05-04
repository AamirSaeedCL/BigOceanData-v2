import { Component, OnInit, Input } from '@angular/core';
import { Entity } from '../../models/entities/vessel';

@Component({
  selector: 'selected-vessel',
  templateUrl: './selected-vessel.component.html',
  styleUrls: ['./selected-vessel.component.scss']
})
export class SelectedVesselComponent implements OnInit  {
  @Input() selectedVessel: Entity.Vessel;

  constructor() { }

  ngOnInit() {
  }

}
