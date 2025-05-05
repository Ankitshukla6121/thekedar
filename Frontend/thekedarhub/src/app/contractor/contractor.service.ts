import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient  , HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/get/projects`);
  }

  addContractorPersonalDetails(ContractorPersonalDetails : any):Observable<any>{
  return this.http.post(`${this.apiUrl}/contractor/personaldetails`,ContractorPersonalDetails,       {withCredentials:true});
  }

  fetchContractorProfile() : Observable<any>{
   return this.http.get(`${this.apiUrl}/contractor/contractorprofile`)
  }

  // Updating Contracor personal info
  updateContractorProfile(updatedData:any):Observable<any>{
    return this.http.patch(`${this.apiUrl}/contractor/updatecontractorprofile`, {updatedData}, {
     
      withCredentials: true, // 🔹 Ensure cookies/tokens are sent);
      
    }); 
  }
 
  // Uploading Profile Image of Contracor
  uploadProfileImage(userId:string , formData:FormData):Observable<any>{
    return this.http.put(`${this.apiUrl}/contractor/update-profile/${userId}`,formData);
  }

  //Featching All projects Realted to ContractorTypes
  getAllProjects():Observable<any>{
    return this.http.get(`${this.apiUrl}/contractor/projets`);
  }




}
