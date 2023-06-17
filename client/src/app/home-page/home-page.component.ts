import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { get, post } from '../api';
import { Reservation } from '../models/Reservation';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  @Input() firstName = '';
  @Input() lastName = '';

  length: number = 31.6; // kilometres
  amount: number = 7; // amount of reservations
  rentals: Reservation[] = []; // list of all reservations
  actual_reservation: boolean = false;

  rental1: Reservation = {
    scooterId: 2,
    userId: 2,
    date: '08.06.2023',
    time: '13:23',
    duration: 2.32,
    price: 12.32,
  };

  rental2: Reservation = {
    scooterId: 7,
    userId: 2,
    date: '12.05.2023',
    time: '23:02',
    duration: 5.12,
    price: 17.21,
  };

  constructor(private _authService: AuthService) {}

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

  async validate() {
    try {
      const res = await get('/auth/validate', {})();
      console.log(res);
    } catch (error) {
      if (error instanceof Error) console.log(error);
    }
  }

  refresh() {
    this._authService.refreshAccessToken();
  }
}
