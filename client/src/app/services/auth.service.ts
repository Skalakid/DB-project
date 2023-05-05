import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { post } from '../api';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);
  constructor() {
    //
  }

  async login(email: string, password: string) {
    const res = await post('/auth/login', {
      email,
      password,
    })();
    console.log(res);
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
