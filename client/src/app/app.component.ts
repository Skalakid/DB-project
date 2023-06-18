import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { VehiclesService } from './services/vehicles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  isLoggedIn = false;

  constructor(
    private _authService: AuthService,
    private _vehiclesService: VehiclesService
  ) {
    this._authService.currentUser.subscribe(val => {
      this.isLoggedIn = !!val;
    });
  }

  logout() {
    if (this.isLoggedIn) this._authService.logout();
  }
}
