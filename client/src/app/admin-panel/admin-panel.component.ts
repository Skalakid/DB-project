import { Component } from '@angular/core';
import { Marker } from '../models/Marker';
import { SelectedMarker } from '../models/SelectedMarker';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { VehiclesService } from '../services/vehicles.service';
import { MapService } from '../services/map.service';
import { Icon } from '../models/Icon';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 50.0647, lng: 19.945 };
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    streetViewControl: false,
    disableDefaultUI: true,
    clickableIcons: false,
  };

  normalIcon: Icon | null = null;
  rentedIcon: Icon | null = null;
  unavailableIcon: Icon | null = null;
  tmpIcon: Icon | null = null;

  onSelectAnimation = google.maps.Animation.BOUNCE;

  isCreatingNewMarker = false;

  selectedMarker: SelectedMarker = {
    type: 'available',
    marker: null,
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

  newEnergy = 0;

  allUsers: User[] = [];

  constructor(
    private _userService: UserService,
    private _vehiclesService: VehiclesService,
    private _authService: AuthService,
    private _mapService: MapService
  ) {
    this.normalIcon = this._mapService.normalIcon;
    this.rentedIcon = this._mapService.rentedIcon;
    this.unavailableIcon = this._mapService.unavailableIcon;
    this.tmpIcon = this._mapService.tmpIcon;

    this._vehiclesService.models.subscribe(models => {
      this.vehicleModels = models || [];
    });

    this._vehiclesService.batteries.subscribe(batteries => {
      this.vehicleBatteries = batteries || [];
    });

    this._vehiclesService.avaliableVehicles.subscribe(vehicles => {
      this.availableMarkers = vehicles || [];
      this.updateSelectedVehice();
    });

    this._vehiclesService.rentedVehicles.subscribe(vehicles => {
      this.rentedMarkers = vehicles || [];
      this.updateSelectedVehice();
    });

    this._vehiclesService.unavaliableVehicles.subscribe(vehicles => {
      this.unavailableMarkers = vehicles || [];
      this.updateSelectedVehice();
    });

    this.getUsers();
  }

  async getUsers() {
    this.allUsers = (await this._userService.getAllUsers()) || [];
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
      if (this.selectedMarker.marker?.vehicleId)
        await this._vehiclesService.updatePosition(
          this.selectedMarker.marker.vehicleId,
          event.latLng?.lat() || 0,
          event.latLng?.lng() || 0
        );
      this.isMoving = false;
      this.newEnergy = 0;
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

  updateSelectedVehice() {
    if (this.selectedMarker.marker) {
      if (this.selectedMarker.type === 'available') {
        this.selectedMarker.marker =
          this.availableMarkers.find(
            item => item.vehicleId === this.selectedMarker.marker?.vehicleId
          ) || null;
      } else if (this.selectedMarker.type === 'unavailable') {
        this.selectedMarker.marker =
          this.unavailableMarkers.find(
            item => item.vehicleId === this.selectedMarker.marker?.vehicleId
          ) || null;
      } else if (this.selectedMarker.type === 'rented') {
        this.selectedMarker.marker =
          this.rentedMarkers.find(
            item => item.vehicleId === this.selectedMarker.marker?.vehicleId
          ) || null;
      }
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

  async changeEnergy() {
    if (
      this.selectedMarker.marker?.vehicleId &&
      this.newEnergy >= 0 &&
      this.newEnergy <= 100
    )
      await this._vehiclesService.updateEnergyLevel(
        this.selectedMarker.marker.vehicleId,
        this.newEnergy
      );
    this.isMoving = false;
    this.newEnergy = 0;
  }

  roundToTwo(num: number) {
    return Math.round(num * 100) / 100;
  }

  getCostString() {
    return this.selectedMarker.marker?.costPerMinute
      ? this.selectedMarker.marker?.costPerMinute.toFixed(2)
      : 0;
  }

  changingPasswordUserId = -1;
  newPassword = '';

  startChangingPassword(userId: number) {
    this.changingPasswordUserId = userId;
  }

  changePassword() {
    if (this.newPassword.length > 0) {
      this._authService.changePassword(
        this.changingPasswordUserId,
        this.newPassword
      );
      this.newPassword = '';
      this.changingPasswordUserId = -1;
    }
  }
}
