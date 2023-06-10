import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Reservation } from '../models/Reservation';
import { Marker } from '../models/Marker';
import { VehiclesService } from '../services/vehicles.service';

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

  rental1: Reservation = {
    date: '08.06.2023',
    time: '13:23',
    duration: 2.32,
    price: 12.32,
  };

  rental2: Reservation = {
    date: '12.05.2023',
    time: '23:02',
    duration: 5.12,
    price: 17.21,
  };

  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 50.0647, lng: 19.945 };
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    streetViewControl: false,
    disableDefaultUI: true,
    clickableIcons: false,
  };

  markers: Marker[] = [];
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    private _authService: AuthService,
    private _vehiclesService: VehiclesService
  ) {
    this._vehiclesService.avaliableVehicles.subscribe(newMarkers => {
      console.log(newMarkers);
      this.markers = newMarkers || [];
    });
  }

  ngOnInit() {
    this._authService.currentUser.subscribe(val => {
      this.firstName = val?.firstName || '';
      this.lastName = val?.lastName || '';
    });

    this.rentals.push(this.rental1);
    this.rentals.push(this.rental2);
  }

  logout() {
    this._authService.logout();
  }
}
