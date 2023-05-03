import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);
  constructor() {
    //
  }

  async login(email: string, password: string) {
    console.log('Login');
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ) {
    console.log('Register');
  }
}
