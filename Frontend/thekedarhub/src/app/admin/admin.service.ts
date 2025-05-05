import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl; // Base API URL from environment

  constructor(private http: HttpClient) {}
  getallContractor():Observable<any>{
    return this.http.get(`${this.apiUrl}/admin/contractor/fetchallcontractor`)
  }

  updateVerification(contractor_updated:any){
    return this.http.post(`${this.apiUrl}/admin/contractor/verifiaction`,contractor_updated)
  }


}