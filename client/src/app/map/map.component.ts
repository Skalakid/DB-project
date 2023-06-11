import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { VehiclesService } from '../services/vehicles.service';
import { UserStats } from '../models/User';
import { Marker } from '../models/Marker';
import { Reservation } from '../models/Reservation';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 50.0647, lng: 19.945 };
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    streetViewControl: false,
    disableDefaultUI: true,
    clickableIcons: false,
  };

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

  markers: Marker[] = [];
  rentedMarkers: Marker[] = [];

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: null,
    icon: this.normalIcon,
  };
  rentedMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: null,
    icon: this.rentedIcon,
  };
  selectedMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.BOUNCE,
    icon: this.selectedIcon,
  };
  selectedRentedMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.BOUNCE,
    icon: this.rentedIcon,
  };

  markerPositions: google.maps.LatLngLiteral[] = [];
  selectedMarker: Marker | null = null;
  selectedRentedMarker: Marker | null = null;
  reservations: Reservation[] = [];
  currentReservations: Reservation[] = [];

  stats: UserStats | null = null;
  isMoving = false;

  constructor(
    private _authService: AuthService,
    private _vehiclesService: VehiclesService,
    private _mapService: MapService
  ) {
    this._vehiclesService.avaliableVehicles.subscribe(newMarkers => {
      this.markers = newMarkers || [];
    });

    this._vehiclesService.rentedVehicles.subscribe(markers => {
      this.rentedMarkers = markers || [];
    });

    this._mapService.isMoving.subscribe(val => (this.isMoving = val));
  }

  selectMarker(index: number) {
    if (!this.isMoving) {
      if (this.markers?.[index]) this.selectedMarker = this.markers[index];
      else this.selectedMarker = null;
      this.selectedRentedMarker = null;
    }

    this._mapService.update(this.selectedMarker, this.selectedRentedMarker);
  }

  selectRentedMarker(index: number) {
    if (!this.isMoving) {
      if (this.rentedMarkers?.[index])
        this.selectedRentedMarker = this.rentedMarkers[index];
      this.selectedMarker = null;
    }

    this._mapService.update(this.selectedMarker, this.selectedRentedMarker);
  }

  mapClick(event: google.maps.MapMouseEvent) {
    console.log();
    if (this.isMoving) {
      if (
        this.selectedRentedMarker?.vehicleId &&
        event.latLng?.lat &&
        event.latLng?.lng
      )
        this._vehiclesService.updatePosition(
          this.selectedRentedMarker?.vehicleId,
          event.latLng?.lat(),
          event.latLng?.lng()
        );
      this._mapService.isMoving.next(false);
    }
    this.selectedMarker = null;
    this.selectedRentedMarker = null;
  }

  logout() {
    this._authService.logout();
  }
}
