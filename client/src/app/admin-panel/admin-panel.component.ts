import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { Vehicle } from '../models/Vehicle';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  userRentals: Reservation[] = generateData();
  vehicleRentals: Reservation[] = generateData2();
  allVehicles: Vehicle[] = generateData3();

  userVisible = false;
  vehicleVisible = false;
  Id = '';

  showUserRentals(): void {
    this.userVisible = true;
    this.vehicleVisible = false;
    this.Id = this.Id || '';
    console.log(this.Id);
  }

  showVehicleRentals(): void {
    this.userVisible = false;
    this.vehicleVisible = true;
    this.Id = this.Id || '';
    console.log(this.Id);
  }
}

function generateData(): Reservation[] {
  const rentals: Reservation[] = [];

  const rental1: Reservation = {
    reservationId: 1,
    vehicleId: 3,
    userId: 5,
    r_begin: '12.05.2023',
    r_end: '12.05.2023',
    duration: '+0 00:05:00',
    cost: 17.21,
  };

  const rental2: Reservation = {
    reservationId: 1,
    vehicleId: 3,
    userId: 5,
    r_begin: '12.05.2023',
    r_end: '12.05.2023',
    duration: '+0 00:05:00',
    cost: 17.21,
  };

  const rental3: Reservation = {
    reservationId: 1,
    vehicleId: 3,
    userId: 5,
    r_begin: '12.05.2023',
    r_end: '12.05.2023',
    duration: '+0 00:05:00',
    cost: 17.21,
  };

  const rental4: Reservation = {
    reservationId: 1,
    vehicleId: 3,
    userId: 5,
    r_begin: '12.05.2023',
    r_end: '12.05.2023',
    duration: '+0 00:05:00',
    cost: 17.21,
  };

  rentals.push(rental1, rental2, rental3, rental4);

  return rentals;
}

function generateData2(): Reservation[] {
  const rentals: Reservation[] = [];

  const rental1: Reservation = {
    reservationId: 1,
    vehicleId: 3,
    userId: 5,
    r_begin: '12.05.2023',
    r_end: '12.05.2023',
    duration: '+0 00:05:00',
    cost: 17.21,
  };

  const rental2: Reservation = {
    reservationId: 1,
    vehicleId: 3,
    userId: 5,
    r_begin: '12.05.2023',
    r_end: '12.05.2023',
    duration: '+0 00:05:00',
    cost: 17.21,
  };

  const rental3: Reservation = {
    reservationId: 1,
    vehicleId: 3,
    userId: 5,
    r_begin: '12.05.2023',
    r_end: '12.05.2023',
    duration: '+0 00:05:00',
    cost: 17.21,
  };

  const rental4: Reservation = {
    reservationId: 1,
    vehicleId: 3,
    userId: 5,
    r_begin: '12.05.2023',
    r_end: '12.05.2023',
    duration: '+0 00:05:00',
    cost: 17.21,
  };

  rentals.push(rental1, rental2, rental3, rental4);

  return rentals;
}

function generateData3(): Vehicle[] {
  const vehicles: Vehicle[] = [];

  const vehicle1: Vehicle = {
    type: 'A',
    model: 'A3',
    length: 1.23,
    width: 1.73,
    weight: 10.0,
    amount: 5,
  };

  const vehicle2: Vehicle = {
    type: 'A',
    model: 'A11',
    length: 1.43,
    width: 1.11,
    weight: 3.21,
    amount: 2,
  };

  const vehicle3: Vehicle = {
    type: 'B',
    model: 'B1',
    length: 3.33,
    width: 12.1,
    weight: 2.12,
    amount: 2,
  };

  vehicles.push(vehicle1, vehicle2, vehicle3);

  return vehicles;
}
