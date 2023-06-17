import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserStats } from '../models/User';
import { AuthService } from './auth.service';
import { get } from '../api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserStats = new BehaviorSubject<UserStats | null>(null);
  userId: number | null = null;

  constructor(private _authService: AuthService) {
    this._authService.currentUser.subscribe(currentUser => {
      this.userId = currentUser?.userId || null;
    });
  }

  refresh() {
    this.getStats();
  }

  async getStats() {
    try {
      const res = await get('/users/stats', {
        userId: this.userId,
      })();
      this.currentUserStats.next(res);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
