import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  userName: string = "";
  userId: string | undefined;
  

  constructor(private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    
  }

  // Logout method
  logout() {
 
    this.authservice.logout().subscribe(()=>{
      this.router.navigate(['auth/signin']);
    })
  }
}
