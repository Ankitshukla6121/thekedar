import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserInfoService {

  private currentUserInfo = new BehaviorSubject<any>(null);
  currentUserInfo$ = this.currentUserInfo.asObservable();

  constructor() { 
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        this.currentUserInfo.next(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem('user'); // Remove corrupted data
      }
    }
  }

  setUSerInfo(user: any) {  // ✅ Keeping the same method name as you requested
    this.currentUserInfo.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserInfo() {
    return this.currentUserInfo.value;
  }

  clearUserInfo() {
    this.currentUserInfo.next(null);
    localStorage.removeItem('user');
  }
}
