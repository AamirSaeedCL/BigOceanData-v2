import { Observable, of } from 'rxjs';
import { Entity } from '../models/entities/vessel';
import LocalStorageService from './local-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export default class VesselService  {
    constructor(private storage: LocalStorageService) {

    }
    public vessels: Entity.Vessel[] = [
        {
            label: {
                color: 'White',
                text:  'A',
            },
            name: 'Vessel A',
            position: {
                lat: 0 ,
                lng: 0,
            },
            options: {
                animation: google.maps.Animation.DROP
            },
            display: true
        },
        {
            label: {
                color: 'White',
                text:  'B',
            },
            name: 'Vessel B',
            position: {
                lat: 0 ,
                lng: 10,
            },
            options: {
                animation: google.maps.Animation.DROP
            },
            display: true
        },
        {
            label: {
                color: 'White',
                text:  'C',
            },
            name: 'Vessel C',
            position: {
                lat: -45 ,
                lng: 10,
            },
            options: {
                animation: google.maps.Animation.DROP
            },
            display: true
        },
        {
            label: {
                color: 'White',
                text:  'D',
            },
            name: 'Vessel D',
            position: {
                lat: 2 ,
                lng: 52,
            },
            options: {
                animation: google.maps.Animation.DROP
            },
            display: true
        },
        {
            label: {
                color: 'White',
                text:  'E',
            },
            name: 'Vessel E',
            position: {
                lat: 12 ,
                lng: 50,
            },
            options: {
                animation: google.maps.Animation.DROP
            },
            display: true
        },
        {
            label: {
                color: 'White',
                text:  'F',
            },
            name: 'Vessel F',
            position: {
                lat: 20 ,
                lng: 0,
            },
            options: {
                animation: google.maps.Animation.DROP
            },
            display: true
        }
    ];

    public getActiveVessel(): Observable<Entity.Vessel[]> {
        this.getDisplayVessels();
        return of(this.vessels.filter(v => v.display === true));
    }

    public getAllVessel(): Observable<Entity.Vessel[]> {
        return of(this.vessels);
    }

    private getDisplayVessels(): void {
        this.vessels.forEach(v => {
          const storagedVessel = this.storage.getKey(v.name);
          if (storagedVessel !== undefined) {
            v.display = storagedVessel.display;
          }
        });
    }
}
