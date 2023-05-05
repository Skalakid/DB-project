import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { post } from '../api';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);
  constructor(private _router: Router) {
    //
  }

  async login(email: string, password: string) {
    try {
      const res = await post('/auth/login', {
        email,
        password,
      })();
      this.currentUser.next(res);
      this._router.navigate(['/']);
    } catch (error) {
      alert('Something went wrong');
    }
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) {
    console.log(firstName, lastName, phoneNumber, email, password);
    const res = await post('/auth/register', {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    })();
    console.log(res);
  }
}
