import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User = new User();
  private userSubject = new BehaviorSubject<User>(this._user);

  user$ = this.userSubject.asObservable();

  private user: User | null = null;

  setUser(user: Partial<User>) {
    if (!this.user) {
      this.user = new User(user);
    } else {
      Object.assign(this.user, user);
    }
  }

  getUser(): User {
    if (!this.user) this.user = new User();
    return this.user;
  }


  // getTotalPrice(): number {
  //   if (!this._user || !this._user.planos) return 0;

  //   const planoPrice = this._user.isAnnual ? this._user.planos.priceAnnual : this._user.planos.monthlyPrice;
  //   const addonsPrice = this._user.addons?.reduce(
  //     (total, a) => total + (this._user.isAnnual ? a.priceAnnual : a.monthlyPrice),
  //     0
  //   ) ?? 0;

  //   return planoPrice + addonsPrice;
  // }
}
