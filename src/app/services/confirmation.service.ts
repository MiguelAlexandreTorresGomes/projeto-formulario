// confirmation.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private confirmSubject = new BehaviorSubject<void>(undefined);
  public confirm$: Observable<void> = this.confirmSubject.asObservable();
  
  private isConfirmedSubject = new BehaviorSubject<boolean>(false);
  public isConfirmed$: Observable<boolean> = this.isConfirmedSubject.asObservable();

  triggerConfirmation(): void {
    this.confirmSubject.next();
  }

  setConfirmed(): void {
    this.isConfirmedSubject.next(true);
  }

  resetConfirmed(): void {
    this.isConfirmedSubject.next(false);
  }

  getIsConfirmed(): boolean {
    return this.isConfirmedSubject.value;
  }
}