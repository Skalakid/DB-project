import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Reservation } from '../models/Reservation';
import { Marker } from '../models/Marker';
import { VehiclesService } from '../services/vehicles.service';
import { getDateTime } from '../date';
import { formatDistance, format } from 'date-fns';
import { pl } from 'date-fns/locale';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  @Input() firstName = '';
  @Input() lastName = '';

  length = 31.6; // kilometres
  amount = 7; // amount of reservations
  rentals: Reservation[] = []; // list of all reservations
  actual_reservation = false;

  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 50.0647, lng: 19.945 };
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    streetViewControl: false,
    disableDefaultUI: true,
    clickableIcons: false,
  };

  markers: Marker[] = [];
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: null,
  };
  selectedMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.BOUNCE,
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  selectedMarker: Marker | null = null;
  reservations: Reservation[] = [];
  currentReservations: Reservation[] = [];

  constructor(
    private _authService: AuthService,
    private _vehiclesService: VehiclesService
  ) {
    this._vehiclesService.avaliableVehicles.subscribe(newMarkers => {
      this.markers = newMarkers || [];
    });

    this._vehiclesService.reservations.subscribe(reservations => {
      this.reservations =
        reservations?.map(res => ({
          ...res,
          duration: formatDistance(new Date(res.r_begin), new Date(res.r_end), {
            locale: pl,
          }),
        })) || [];
    });

    this._vehiclesService.currentReservations.subscribe(reservations => {
      this.currentReservations =
        reservations?.map(res => ({
          ...res,
          r_end: getDateTime(new Date(res.r_end)),
        })) || [];
    });
  }

  ngOnInit() {
    this._authService.currentUser.subscribe(val => {
      this.firstName = val?.firstName || '';
      this.lastName = val?.lastName || '';
    });
  }

  selectMarker(index: number) {
    this.selectedMarker = this.markers[index];
  }

  makeReservation() {
    const userID = this._authService.currentUser.value?.userId;
    const vehicleID = this.selectedMarker?.vehicleId;
    if (userID && vehicleID) {
      this._vehiclesService.makeReservation(userID, vehicleID, '+0 00:05:00');
    }
  }

  formatDate(dateString: string) {
    return format(new Date(dateString), 'yyyy-MM-dd');
  }

  logout() {
    this._authService.logout();
  }
}
