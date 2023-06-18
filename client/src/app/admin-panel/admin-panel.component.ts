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

  userVisible: boolean = false;
  vehicleVisible: boolean = false;
  Id: string = '';

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
  let rentals: Reservation[] = [];

  let rental1: Reservation = {
    scooterId: 3,
    userId: 1,
    date: '12.05.2023',
    time: '23:02',
    duration: 5.12,
    price: 17.21,
  };

  let rental2: Reservation = {
    scooterId: 5,
    userId: 1,
    date: '08.06.2023',
    time: '13:23',
    duration: 2.32,
    price: 12.32,
  };

  let rental3: Reservation = {
    scooterId: 5,
    userId: 1,
    date: '12.06.2023',
    time: '17:15',
    duration: 22.32,
    price: 37.22,
  };

  let rental4: Reservation = {
    scooterId: 1,
    userId: 1,
    date: '12.02.2023',
    time: '22:22',
    duration: 22.32,
    price: 7.89,
  };

  rentals.push(rental1, rental2, rental3, rental4);

  return rentals;
}

function generateData2(): Reservation[] {
  let rentals: Reservation[] = [];

  let rental1: Reservation = {
    scooterId: 3,
    userId: 5,
    date: '12.05.2023',
    time: '23:02',
    duration: 5.12,
    price: 17.21,
  };

  let rental2: Reservation = {
    scooterId: 5,
    userId: 6,
    date: '08.06.2023',
    time: '13:23',
    duration: 2.32,
    price: 12.32,
  };

  let rental3: Reservation = {
    scooterId: 5,
    userId: 6,
    date: '12.06.2023',
    time: '17:15',
    duration: 22.32,
    price: 37.22,
  };

  let rental4: Reservation = {
    scooterId: 1,
    userId: 2,
    date: '12.02.2023',
    time: '22:22',
    duration: 22.32,
    price: 7.89,
  };

  rentals.push(rental1, rental2, rental3, rental4);

  return rentals;
}

function generateData3(): Vehicle[] {
  let vehicles: Vehicle[] = [];

  let vehicle1: Vehicle = {
    type: 'A',
    model: 'A3',
    length: 1.23,
    width: 1.73,
    weight: 10.0,
    amount: 5,
  };

  let vehicle2: Vehicle = {
    type: 'A',
    model: 'A11',
    length: 1.43,
    width: 1.11,
    weight: 3.21,
    amount: 2,
  };

  let vehicle3: Vehicle = {
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
