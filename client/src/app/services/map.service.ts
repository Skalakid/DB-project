import { Injectable } from '@angular/core';
import { Marker } from '../models/Marker';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  selectedMarker = new BehaviorSubject<Marker | null>(null);
  selectedRentedMarker = new BehaviorSubject<Marker | null>(null);
  isMoving = new BehaviorSubject<boolean>(false);

  constructor() {
    //
  }

  update(selectedMarker: Marker | null, selectedRentedMarker: Marker | null) {
    this.selectedMarker.next(selectedMarker);
    this.selectedRentedMarker.next(selectedRentedMarker);
  }
}
