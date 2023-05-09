import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { get, post } from '../api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  @Input() firstName = '';
  @Input() lastName = '';

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.currentUser.subscribe(val => {
      this.firstName = val?.firstName || '';
      this.lastName = val?.lastName || '';
    });
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
