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
import { MapService } from '../services/map.service';

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
  selectedMarker: Marker | null = null;
  selectedRentedMarker: Marker | null = null;
  reservations: Reservation[] = [];
  currentReservations: Reservation[] = [];
  stats: UserStats | null = null;
  isMoving = false;

  constructor(
    private _authService: AuthService,
    private _vehiclesService: VehiclesService,
    private _userService: UserService,
    private _mapService: MapService
  ) {
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

    this._mapService.selectedMarker.subscribe(
      val => (this.selectedMarker = val)
    );

    this._mapService.selectedRentedMarker.subscribe(
      val => (this.selectedRentedMarker = val)
    );

    this._mapService.isMoving.subscribe(val => (this.isMoving = val));
  }

  makeReservation() {
    const userID = this._authService.currentUser.value?.userId;
    const vehicleID = this.selectedMarker?.vehicleId;
    if (userID && vehicleID) {
      this._vehiclesService.makeReservation(userID, vehicleID, '+0 00:05:00');
    }
    this.selectedMarker = null;
  }

  formatDate(dateString: string) {
    return format(new Date(dateString), 'yyyy-MM-dd');
  }

  move() {
    this._mapService.isMoving.next(true);
  }

  selectOnMap(index: number) {
    this._mapService.selectRentedMarker(index);
  }

  logout() {
    this._authService.logout();
  }
}
