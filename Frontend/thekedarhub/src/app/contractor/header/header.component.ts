import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrected `styleUrls` syntax
})
export class HeaderComponent {
  userName: string | null = ''; // Declare class member for storing user name

  constructor(private router: Router) {
    // Initialize userName from localStorage
    this.userName = localStorage.getItem('userName');
  }

  logout() {
    // Clear token and user data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName'); // Optionally clear user data

    // Redirect to the login page
    this.router.navigate(['/']); // Replace '/login' with your login route if needed
  }
}
