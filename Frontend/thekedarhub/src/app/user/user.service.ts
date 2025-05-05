import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl; // Base API URL from environment

  constructor(private http: HttpClient , private authservice : AuthService) {}
   
  // Method to add a project
  addProject(projectData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/projects/add`, projectData ,{ withCredentials: true });
  }
  getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/get/projects`);
  }
 
  

}
