import { Component } from '@angular/core';
import { ContractorService } from '../contractor.service';
import { response } from 'express';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projects: any[] = [];
  constructor(private projectService:ContractorService){}
  ngOnInit(): void {
    this.getAllProjects();  // Call the method to fetch projects when component loads
  }

  

  getAllProjects(){
    this.projectService.getAllProjects().subscribe({
      next:(response)=>{
        this.projects=response;
      },
      error:(err)=>{
        console.error('Error fetching projects:',err);
      },
    });
  }
}
