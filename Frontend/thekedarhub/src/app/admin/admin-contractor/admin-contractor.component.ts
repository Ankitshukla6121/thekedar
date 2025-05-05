import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-contractor',
  templateUrl: './admin-contractor.component.html',
  styleUrls: ['./admin-contractor.component.css'] // Corrected property name
})
export class AdminContractorComponent implements OnInit {
  contractors: any[] = []; // Initialize as an empty array
  errorMessage: string | null = null; // To handle errors

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchContractors();
  }

  fetchContractors(): void {
    this.adminService.getallContractor().subscribe({
      next: (data) => {
        this.contractors = data.contractors; // Adjust based on API response structure
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'An error occurred while fetching contractors.';
      }
    });
  }
  toggleVerification(contractor: any): void {
    contractor.isVerified = !contractor.isVerified; 
    this.adminService.updateVerification(contractor
    ).subscribe()
  };


}
