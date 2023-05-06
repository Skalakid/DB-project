import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { _delete, post } from '../api';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);
  constructor(private _router: Router) {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser.next(JSON.parse(user));
      console.log('LOGGED INT', user);
    }
  }

  async login(email: string, password: string) {
    try {
      const res = await post('/auth/login', {
        email,
        password,
      })();

      await localStorage.setItem('accessToken', res.accessToken);
      await localStorage.setItem('refreshToken', res.refreshToken);
      await localStorage.setItem('user', JSON.stringify(res));
      console.log(await localStorage.getItem('refreshToken'));
      this.currentUser.next(res);
      this._router.navigate(['/']);
    } catch (error) {
      alert('Something went wrong');
    }
  }

  async logout() {
    try {
      const refreshToken = await localStorage.getItem('refreshToken');
      await _delete('/auth/logout', {
        token: refreshToken,
      })();
    } catch (error) {
      // console.error('[LOGOUT ERROR]', error); // I commented this log because everytime we refresh the server,
      // server loses refreshTokens info and it "thinks" that we are already logged out.
    }
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) {
    try {
      const res = await post('/auth/register', {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      })();
      console.log(res);
      this._router.navigate(['/login']);
    } catch (error) {
      alert('Something went wrong when registering the user');
    }
  }
}
