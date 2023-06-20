import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) {}

  canActivate() {
    return this._authService.currentUser.pipe(
      map(val => {
        if (val) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
