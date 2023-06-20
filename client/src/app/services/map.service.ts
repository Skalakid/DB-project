import { Injectable } from '@angular/core';
import { Marker } from '../models/Marker';
import { BehaviorSubject } from 'rxjs';
import { VehiclesService } from './vehicles.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  selectedMarker = new BehaviorSubject<Marker | null>(null);
  selectedRentedMarker = new BehaviorSubject<Marker | null>(null);
  isMoving = new BehaviorSubject<boolean>(false);

  markers = new BehaviorSubject<Marker[]>([]);
  rentedMarkers = new BehaviorSubject<Marker[]>([]);

  normalIcon = {
    url: '../../assets/mark.png',
    scaledSize: new google.maps.Size(50, 50),
  };

  rentedIcon = {
    url: '../../assets/mark1.png',
    scaledSize: new google.maps.Size(50, 50),
  };

  selectedIcon = {
    url: '../../assets/mark2.png',
    scaledSize: new google.maps.Size(50, 50),
  };

  unavailableIcon = {
    url: '../../assets/mark3.png',
    scaledSize: new google.maps.Size(50, 50),
  };

  tmpIcon = {
    url: '../../assets/mark4.png',
    scaledSize: new google.maps.Size(50, 50),
  };

  constructor(private _vehiclesService: VehiclesService) {
    this._vehiclesService.avaliableVehicles.subscribe(newMarkers => {
      this.markers.next(newMarkers || []);
    });

    this._vehiclesService.rentedVehicles.subscribe(markers => {
      this.rentedMarkers.next(markers || []);
    });
  }

  update(selectedMarker: Marker | null, selectedRentedMarker: Marker | null) {
    this.selectedMarker.next(selectedMarker);
    this.selectedRentedMarker.next(selectedRentedMarker);
  }

  selectMarker(index: number) {
    if (!this.isMoving.value) {
      if (this.markers.value?.[index])
        this.selectedMarker.next(this.markers.value[index]);
      else this.selectedMarker.next(null);
      this.selectedRentedMarker.next(null);
    }
  }

  selectRentedMarker(index: number) {
    if (!this.isMoving.value) {
      if (this.rentedMarkers.value?.[index])
        this.selectedRentedMarker.next(this.rentedMarkers.value[index]);
      this.selectedMarker.next(null);
    }
  }
}
