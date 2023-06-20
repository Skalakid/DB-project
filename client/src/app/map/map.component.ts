import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { VehiclesService } from '../services/vehicles.service';
import { UserStats } from '../models/User';
import { Marker } from '../models/Marker';
import { Reservation } from '../models/Reservation';
import { MapService } from '../services/map.service';
import { Icon } from '../models/Icon';

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

  onSelectAnimation = google.maps.Animation.BOUNCE;

  normalIcon: Icon | null = null;
  rentedIcon: Icon | null = null;
  selectedIcon: Icon | null = null;

  markers: Marker[] = [];
  rentedMarkers: Marker[] = [];

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
    this.normalIcon = this._mapService.normalIcon;
    this.rentedIcon = this._mapService.rentedIcon;
    this.selectedIcon = this._mapService.selectedIcon;

    this._mapService.markers.subscribe(newMarkers => {
      this.markers = newMarkers || [];
    });

    this._mapService.rentedMarkers.subscribe(markers => {
      this.rentedMarkers = markers || [];
    });

    this._mapService.isMoving.subscribe(val => (this.isMoving = val));

    this._mapService.selectedMarker.subscribe(
      val => (this.selectedMarker = val)
    );

    this._mapService.selectedRentedMarker.subscribe(
      val => (this.selectedRentedMarker = val)
    );
  }

  selectMarker(index: number) {
    this._mapService.selectMarker(index);
  }

  selectRentedMarker(index: number) {
    this._mapService.selectRentedMarker(index);
  }

  mapClick(event: google.maps.MapMouseEvent) {
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

    this._mapService.selectedMarker.next(null);
    this._mapService.selectedRentedMarker.next(null);
  }

  logout() {
    this._authService.logout();
  }
}
