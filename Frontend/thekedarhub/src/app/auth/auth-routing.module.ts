import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninWithHeaderFooterComponent } from './signin-with-header-footer/signin-with-header-footer.component';
import { SignupWithHeaderFooterComponent } from './signup-with-header-footer/signup-with-header-footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
const routes:Routes=[
    {path : 'signin' , component: SigninWithHeaderFooterComponent},
    {path : 'signup', component:SignupWithHeaderFooterComponent},
    {path : 'forgot-password' , component:ForgotPasswordComponent},
    {path : 'reset-password' , component : ResetPasswordComponent}

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AuthRoutingModule{}
