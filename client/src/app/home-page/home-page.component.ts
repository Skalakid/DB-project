import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Reservation } from '../models/Reservation';
import { Marker } from '../models/Marker';
import { VehiclesService } from '../services/vehicles.service';
import { getDateTime } from '../date';
import { formatDistance, format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { UserStats } from '../models/User';
import { UserService } from '../services/user.service';

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
    private _userService: UserService
  ) {
    this._vehiclesService.avaliableVehicles.subscribe(newMarkers => {
      this.markers = newMarkers || [];
    });

    this._vehiclesService.rentedVehicles.subscribe(markers => {
      this.rentedMarkers = markers || [];
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

    this._userService.currentUserStats.subscribe(res => {
      this.stats = res;
    });

    this._authService.currentUser.subscribe(val => {
      this.firstName = val?.firstName || '';
      this.lastName = val?.lastName || '';
    });
  }

  selectMarker(index: number) {
    if (!this.isMoving) {
      if (this.markers?.[index]) this.selectedMarker = this.markers[index];
      else this.selectedMarker = null;
      this.selectedRentedMarker = null;
    }
  }

  selectRentedMarker(index: number) {
    if (!this.isMoving) {
      if (this.rentedMarkers?.[index])
        this.selectedRentedMarker = this.rentedMarkers[index];
      this.selectedMarker = null;
    }
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
      this.isMoving = false;
    }
    this.selectedMarker = null;
    this.selectedRentedMarker = null;
  }

  makeReservation() {
    const userID = this._authService.currentUser.value?.userId;
    const vehicleID = this.selectedMarker?.vehicleId;
    if (userID && vehicleID) {
      this._vehiclesService.makeReservation(userID, vehicleID, '+0 00:05:00');
    }
    this.selectedMarker = null;
  }

  move() {
    this.isMoving = true;
  }

  formatDate(dateString: string) {
    return format(new Date(dateString), 'yyyy-MM-dd');
  }

  logout() {
    this._authService.logout();
  }
}
