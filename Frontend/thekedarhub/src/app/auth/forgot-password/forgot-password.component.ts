import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  
  constructor(private router: Router, private route: ActivatedRoute) { }

	// On SignIn link click
  onhome(){
    this.router.navigate(['/'], { relativeTo: this.route.parent });
  }
	onSignIn() {
	  this.router.navigate(['signin-with-header-footer'], { relativeTo: this.route.parent });
	}
  onSignup() {
    this.router.navigate(['signup-with-header-footer'], { relativeTo: this.route.parent });
  }

  ngOnInit(): void {
  }

}
