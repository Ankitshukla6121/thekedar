import { Component } from '@angular/core';
import { SlidebarComponent } from '../slidebar/slidebar.component';
import { AddprojectComponent } from '../addproject/addproject.component';
import { UserService } from '../user.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  constructor( private projectService: UserService){}
  projects: any[] = [];
  ngOnInit(): void {
    this.getProjects();  // Call the method to fetch projects when component loads
  }

  getProjects() {
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.projects = response.projects;  // Assign the fetched projects to the `projects` array
        
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      },
    });
  }
}
