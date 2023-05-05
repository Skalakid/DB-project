import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) {}

  canActivate() {
    if (this._authService.currentUser.value != null) return true;
    this.router.navigate(['login']);
    return false;
  }
}
