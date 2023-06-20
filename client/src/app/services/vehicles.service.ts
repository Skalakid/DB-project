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
  unavaliableVehicles = new BehaviorSubject<Marker[] | null>(null);
  avaliableVehicles = new BehaviorSubject<Marker[] | null>(null);
  rentedVehicles = new BehaviorSubject<Marker[] | null>(null);
  currentReservations = new BehaviorSubject<Reservation[] | null>(null);
  reservations = new BehaviorSubject<Reservation[] | null>(null);
  models = new BehaviorSubject<string[] | null>(null);
  batteries = new BehaviorSubject<string[] | null>(null);
  userId: number | null = null;

  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ) {
    this._authService.currentUser.subscribe(currentUser => {
      this.userId = currentUser?.userId || null;
      this.refresh();
    });
  }

  refresh() {
    console.log('Refreshing vehicles service...');
    this.getAvaliableVehicles();
    this.getRentedVehicles();
    this.getUserCurrentReservations();
    this.getUserAllReservations();
    this.getAllModels();
    this.getAllBatteries();
    this.getAllUnavailableVehicles();
    this._userService.refresh();
  }

  async getAllUnavailableVehicles() {
    try {
      const res = await get('/vehicles/get/all/unavailable', {})();
      this.unavaliableVehicles.next(res);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async getAvaliableVehicles() {
    try {
      const res = await get('/vehicles/get/all/available', {})();
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

  async getAllModels() {
    try {
      const res = await get('/vehicles/get/models', {})();
      this.models.next(res);
      return res;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async getAllBatteries() {
    try {
      const res = await get('/vehicles/get/batteries', {})();
      this.batteries.next(res);
      return res;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async addVehicle(
    modelID: string,
    batteryCode: string,
    lng: number,
    lat: number,
    vehicleStatus: string,
    energyLvl: number,
    costPerMinute: number
  ) {
    try {
      const res = await post('/vehicles/add', {
        modelID,
        batteryCode,
        lat,
        lng,
        vehicleStatus,
        energyLvl,
        costPerMinute,
      })();
      this.refresh();
      return res;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async toggleVehicleStatus(vehicleId: number) {
    try {
      const res = await post('/vehicles/toggle/status', { vehicleId })();
      this.getAvaliableVehicles();
      this.getAllUnavailableVehicles();
      return res;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async updateEnergyLevel(vehicleId: number, energyLevel: number) {
    try {
      const res = await post('/vehicles/update/energylvl', {
        vehicleId,
        energyLevel,
      })();
      this.getAvaliableVehicles();
      this.getAllUnavailableVehicles();
      return res;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async updateCost(vehicleId: number, cost: number) {
    try {
      const res = await post('/vehicles/update/cost', {
        vehicleId,
        cost,
      })();
      this.getAvaliableVehicles();
      this.getAllUnavailableVehicles();
      return res;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
