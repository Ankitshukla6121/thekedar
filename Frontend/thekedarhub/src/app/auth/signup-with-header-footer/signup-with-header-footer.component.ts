import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { AuthService } from '../auth.service';  // Import AuthService

@Component({
  selector: 'app-signup-with-header-footer',
  templateUrl: './signup-with-header-footer.component.html',
  styleUrls: ['./signup-with-header-footer.component.scss']
})
export class SignupWithHeaderFooterComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl(' ', [Validators.required]),
    terms: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService  // Inject AuthService
  ) { }

  onSignIn() {
    this.router.navigate(['signin-with-header-footer'], { relativeTo: this.route.parent });
  }

  onSignup() {
    this.router.navigate(['signup-with-header-footer'], { relativeTo: this.route.parent });
  }

  onhome() {
    this.router.navigate(['/'], { relativeTo: this.route.parent });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      console.log(userData);
      // Call the signup method from AuthService and handle the response
      this.authService.signup(userData).subscribe(
        response => {
          console.log('Sign up successful:');
          // Redirect or show success message here
          this.router.navigate(['auth/signin']);  // Redirect to login page after successful sign-up
        },
        error => {
          console.error('Sign up failed:', error);
          // Handle error here, e.g., show an error message to the user
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  ngOnInit(): void {
    // Any initialization code
  }
}
