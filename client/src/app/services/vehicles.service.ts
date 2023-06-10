import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GoogleMarker, Marker } from '../models/Marker';
import { get } from '../api';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  avaliableVehicles = new BehaviorSubject<Marker[] | null>(null);

  constructor() {
    //
    this.getAvaliableVehicles();
  }

  async getAvaliableVehicles() {
    try {
      const res = await get('/vehicles/get/all', {})();
      console.log(res);
      this.avaliableVehicles.next(res);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
