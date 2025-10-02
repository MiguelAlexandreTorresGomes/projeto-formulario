import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;
  private _user: User = new User();
  private userSubject = new BehaviorSubject<User>(this._user);
  user$ = this.userSubject.asObservable();

  setUser(user: Partial<User>) {
    if (!this._user) {
      this._user = new User(user);
    } else {
      Object.assign(this._user, user);
    }
  }

  getUser(): User {
    if (!this._user) this._user = new User();
    return this._user;
  }
}
