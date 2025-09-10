import { Injectable } from '@angular/core';
import { Planos } from '../models/planos/planos.model';
import { UserService } from './user.service';
import { User } from '../models/user/user.model';
@Injectable({
  providedIn: 'root'
})
export class PlanosService {
  user: User | null = null;

  getPlanoPrice(plano: Planos): number {
    return this.user?.isAnnual ? plano.priceAnnual : plano.monthlyPrice;
  }

  constructor() { }
}
