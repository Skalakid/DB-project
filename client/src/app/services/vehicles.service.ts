import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Marker } from '../models/Marker';
import { get, post } from '../api';
import { AuthService } from './auth.service';
import { Reservation } from '../models/Reservation';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  avaliableVehicles = new BehaviorSubject<Marker[] | null>(null);
  rentedVehicles = new BehaviorSubject<Marker[] | null>(null);
  currentReservations = new BehaviorSubject<Reservation[] | null>(null);
  reservations = new BehaviorSubject<Reservation[] | null>(null);
  userId: number | null = null;

  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ) {
    this._authService.currentUser.subscribe(currentUser => {
      this.userId = currentUser?.userId || null;
    });
    this.refresh();
  }

  refresh() {
    this.getAvaliableVehicles();
    this.getRentedVehicles();
    this.getUserCurrentReservations();
    this.getUserAllReservations();
    this._userService.refresh();
  }

  async getAvaliableVehicles() {
    try {
      const res = await get('/vehicles/get/all', {})();
      this.avaliableVehicles.next(res);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async getRentedVehicles() {
    try {
      const res = await get('/vehicles/get/rented/user', {
        userId: this.userId,
      })();
      this.rentedVehicles.next(res);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async getUserCurrentReservations() {
    try {
      const res = await get('/users/reservations/current', {
        userId: this.userId,
      })();
      this.currentReservations.next(res);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async getUserAllReservations() {
    try {
      const res = await get('/users/reservations/all', {
        userId: this.userId,
      })();
      this.reservations.next(res);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async makeReservation(userId: number, vehicleId: number, duration: string) {
    try {
      await post('/users/reservations/add', {
        userId,
        vehicleId,
        duration,
      })();
      this.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async updatePosition(vehicleId: number, lat: number, lng: number) {
    try {
      await post('/vehicles//update/position', {
        vehicleId,
        lat,
        lng,
      })();
      this.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
