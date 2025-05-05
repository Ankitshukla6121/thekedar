import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import {User} from '../shared/models/user.model'
import { CurrentUserInfoService } from '../shared/services/current-user-info.service';
import { color } from '@cloudinary/url-gen/qualifiers/background';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient , private CurrentUserInfoService  : CurrentUserInfoService ) {
    //  Load user from sessionStorage on service initialization
    const storedUser = sessionStorage.getItem('userInfo');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
  

  }

  signin(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signin`, userData, { withCredentials: true }).pipe(
      tap((response: any) => {
        if (response.user) {
          // Store user data in sessionStorage
          //sessionStorage.setItem('userInfo', JSON.stringify(response.user)); for this approach we can add user info in seesion storage 
          this.currentUserSubject.next(response.user);
          this.CurrentUserInfoService.setUSerInfo(response.user);
        }
      })
    );
    
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, userData);
  }

  refreshToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/refresh`, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        // Clear user session completely
        sessionStorage.removeItem('userInfo');
        this.currentUserSubject.next(null);
        this.CurrentUserInfoService.clearUserInfo();
      })
    );
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getUserRole(): string | null {
    return this.currentUserSubject.value?.role || null;
  }

  

}
