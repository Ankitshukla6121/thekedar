import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InboxComponent } from './inbox/inbox.component';
import { ProjectComponent } from './project/project.component';
import { HeaderComponent } from './header/header.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { PlacedbidComponent } from './placedbid/placedbid.component';
import { ViewbidsComponent } from './viewbids/viewbids.component';
import { UpdateprofileComponent } from './profile/updateprofile/updateprofile.component';
import { AddprofileComponent } from './profile/addprofile/addprofile.component';
@NgModule({
    declarations: [
     UserComponent,
     ProfileComponent,
     DashboardComponent,
     InboxComponent,
     ProjectComponent,
     HeaderComponent,
     SlidebarComponent,
     AddprojectComponent,
     PlacedbidComponent,
     ViewbidsComponent,
     UpdateprofileComponent,
     AddprofileComponent,
     
     
    ],
    imports: [
      CommonModule,
      UserRoutingModule,
      ReactiveFormsModule,  // Add ReactiveFormsModule
      FormsModule,
      
    ],
    providers: [UserService]
  })
  export class UserModule { }