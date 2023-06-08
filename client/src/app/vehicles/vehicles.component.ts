import { Component } from '@angular/core';
import { Vehicle } from '../models/Vehicle';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent {
  vehicles = generateData();

  // W celu fajnej prezentacji uznałem, że 1 litera modelu to typ aby fajnie posegregowac
  vehicleClasses: string[] = ['A', 'S', 'X', 'PRO'];
  getFilteredVehicles(classType: string): Vehicle[] {
    return this.vehicles.filter(vehicle => vehicle.type === classType);
  }
  selectedVehicle: Vehicle | null = null;

  showDetails(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
  }

  hideDetails() {
    this.selectedVehicle = null;
  }
  getTooltipContent(vehicle: Vehicle): string {
    return `Length: ${vehicle.length} | Width: ${vehicle.width} | Weight: ${vehicle.weight} | Amount: ${vehicle.amount}`;
  }
}

function generateData(): Vehicle[] {
  const vehicles: Vehicle[] = [];

  const vehicle: Vehicle = {
    type: 'A',
    model: 'A2',
    length: 1.03,
    width: 0.21,
    weight: 2.21,
    amount: 4,
  };
  vehicles.push(vehicle);

  const vehicle1: Vehicle = {
    type: 'A',
    model: 'A1',
    length: 0.92,
    width: 0.53,
    weight: 5.01,
    amount: 7,
  };
  vehicles.push(vehicle1);

  const vehicle2: Vehicle = {
    type: 'A',
    model: 'AS1',
    length: 0.21,
    width: 0.55,
    weight: 5.55,
    amount: 2,
  };
  vehicles.push(vehicle2);

  const vehicle3: Vehicle = {
    type: 'S',
    model: 'S1',
    length: 2.21,
    width: 1.02,
    weight: 1.11,
    amount: 21,
  };
  vehicles.push(vehicle3);

  const vehicle4: Vehicle = {
    type: 'S',
    model: 'S3',
    length: 1.69,
    width: 4.2,
    weight: 0.42,
    amount: 8,
  };
  vehicles.push(vehicle4);

  const vehicle5: Vehicle = {
    type: 'PRO',
    model: 'PRO',
    length: 10.23,
    width: 5.55,
    weight: 7.21,
    amount: 5,
  };
  vehicles.push(vehicle5);

  const vehicle6: Vehicle = {
    type: 'X',
    model: 'XA9',
    length: 9.99,
    width: 3.33,
    weight: 5.55,
    amount: 2,
  };
  vehicles.push(vehicle6);

  return vehicles;
}
