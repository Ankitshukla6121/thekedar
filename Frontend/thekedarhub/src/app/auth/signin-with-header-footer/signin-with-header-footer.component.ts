import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import{User} from '../../shared/models/user.model';

@Component({
  selector: 'app-signin-with-header-footer',
  templateUrl: './signin-with-header-footer.component.html',
  styleUrls: ['./signin-with-header-footer.component.scss']
})

export class SigninWithHeaderFooterComponent implements OnInit {
  

  email: string = '';
  password: string = '';
  loginError: string = '';
  user$!: Observable<User | null>;
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService,
   
  ) { }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getUserRole();
      if (role === 'admin') {
        this.router.navigate(['/admin/home']);
      } else if (role === 'user') {
        this.router.navigate(['/user/home']);
      } else if (role === 'contractor') {
        this.router.navigate(['/contractor/home']);
      } else {
        this.router.navigate(['/']);
      }
    }
    
  }

  onForgotpassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  }

  onSignup() {
    this.router.navigate(['signup-with-header-footer'], { relativeTo: this.route.parent });
  }

  onhome() {
    this.router.navigate(['/'], { relativeTo: this.route.parent });
  }

  onSignIn() {
    const credentials = { email: this.email, password: this.password };
    this.authService.signin(credentials).subscribe({
      next: (response) => {
        // Tokens are set as HTTP-only cookies; we use the returned user info for redirection.
        const user = response.user;
        const role = user.role;
       
        if (role === 'admin') {
          this.router.navigate(['/admin/home']);
        } else if (role === 'user') {
          this.router.navigate(['/user/home']);
        } else if (role === 'contractor') {
          this.router.navigate(['/contractor/home']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
       
        this.loginError = err.error?.message || 'Login failed';
      }
    });
  }
  
 

  // Additional toastr examples
 
  

 
}
