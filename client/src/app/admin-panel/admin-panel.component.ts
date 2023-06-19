import { Component } from '@angular/core';
import { Marker } from '../models/Marker';
import { Reservation } from '../models/Reservation';
import { SelectedMarker } from '../models/SelectedMarker';
import { Vehicle } from '../models/Vehicle';
import { MapService } from '../services/map.service';
import { VehiclesService } from '../services/vehicles.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  userRentals: Reservation[] = generateData();
  vehicleRentals: Reservation[] = generateData2();
  allVehicles: Vehicle[] = generateData3();

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

  unavailableIcon = {
    url: '../../assets/mark2.png',
    scaledSize: new google.maps.Size(50, 50),
  };

  isCreatingNewMarker = false;

  selectedMarker: SelectedMarker = {
    type: 'available',
    marker: null,
  };

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
  unavailableMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: null,
    icon: this.unavailableIcon,
  };

  selectedMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.BOUNCE,
    icon: this.normalIcon,
  };
  selectedRentedMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.BOUNCE,
    icon: this.rentedIcon,
  };
  selectedUnavailableMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.BOUNCE,
    icon: this.unavailableIcon,
  };

  userVisible = false;
  vehicleVisible = false;
  Id = '';

  availableMarkers: Marker[] = [];
  rentedMarkers: Marker[] = [];
  unavailableMarkers: Marker[] = [];

  vehicleModels: string[] = [];
  vehicleBatteries: string[] = [];

  selectedModel = '';
  selectedBatteryCode = '';
  available = true;
  costPerMinute = 0;
  energyLvl = 0;
  latCords = 0;
  lngCords = 0;

  isMoving = false;

  constructor(
    private _mapService: MapService,
    private _vehiclesService: VehiclesService
  ) {
    this._vehiclesService.models.subscribe(models => {
      this.vehicleModels = models || [];
    });

    this._vehiclesService.batteries.subscribe(batteries => {
      this.vehicleBatteries = batteries || [];
    });

    this._vehiclesService.avaliableVehicles.subscribe(vehicles => {
      this.availableMarkers = vehicles || [];
    });

    this._vehiclesService.rentedVehicles.subscribe(vehicles => {
      this.rentedMarkers = vehicles || [];
    });

    this._vehiclesService.unavaliableVehicles.subscribe(vehicles => {
      this.unavailableMarkers = vehicles || [];
    });
  }

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

  async selectCords(event: google.maps.MapMouseEvent) {
    if (!this.isMoving)
      if (this.selectedMarker.marker) {
        this.selectedMarker.marker = null;
      } else {
        this.lngCords = event.latLng?.lng() || 0;
        this.latCords = event.latLng?.lat() || 0;
        this.isCreatingNewMarker = true;
      }
    else {
      this.isMoving = false;

      if (this.selectedMarker.marker?.vehicleId)
        await this._vehiclesService.updatePosition(
          this.selectedMarker.marker.vehicleId,
          event.latLng?.lat() || 0,
          event.latLng?.lng() || 0
        );

      this.selectedMarker.marker = null;
    }
  }

  addVehicle() {
    const status = this.available ? 'Available' : 'Not available';

    if (
      this.isCreatingNewMarker &&
      this.selectedModel !== '' &&
      this.selectedBatteryCode !== ''
    )
      this._vehiclesService.addVehicle(
        this.selectedModel,
        this.selectedBatteryCode,
        this.lngCords,
        this.latCords,
        status,
        this.energyLvl,
        this.costPerMinute
      );
    else {
      alert('Wypełnij wszystki pola!');
    }

    this.isCreatingNewMarker = false;
    this.selectedModel = '';
    this.selectedBatteryCode = '';
    this.available = true;
    this.costPerMinute = 0;
    this.energyLvl = 0;
    this.latCords = 0;
    this.lngCords = 0;
  }

  selectAvailableVehice(index: number) {
    if (!this.isMoving)
      if (this.availableMarkers?.[index]) {
        this.selectedMarker = {
          type: 'available',
          marker: this.availableMarkers[index],
        };
      }
  }

  selectUnavailableVehice(index: number) {
    if (!this.isMoving)
      if (this.unavailableMarkers?.[index]) {
        this.selectedMarker = {
          type: 'unavailable',
          marker: this.unavailableMarkers[index],
        };
      }
  }

  selectRentedVehicle(index: number) {
    if (!this.isMoving)
      if (this.rentedMarkers?.[index]) {
        this.selectedMarker = {
          type: 'rented',
          marker: this.rentedMarkers[index],
        };
      }
  }

  async toggleVehicleStatus() {
    if (!this.isMoving)
      if (this.selectedMarker.marker?.vehicleId) {
        await this._vehiclesService.toggleVehicleStatus(
          this.selectedMarker.marker.vehicleId
        );
        this.selectedMarker.marker = null;
      }
  }

  async startMoving() {
    this.isMoving = true;
  }

  async move(event: google.maps.MapMouseEvent) {
    if (this.isMoving) {
      if (
        this.selectedMarker.marker?.vehicleId &&
        event.latLng?.lat &&
        event.latLng?.lng
      )
        this._vehiclesService.updatePosition(
          this.selectedMarker.marker.vehicleId,
          event.latLng?.lat(),
          event.latLng?.lng()
        );
      this.isMoving = false;
    }
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
