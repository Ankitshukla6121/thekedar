import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorRoutingModule } from './contractor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractorService } from './contractor.service';
import { ContractorComponent } from './contractor.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { ProjectComponent } from './project/project.component';
import { InboxComponent } from './inbox/inbox.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BidComponent } from './project/bid/bid.component';
import { ViewprojectComponent } from './project/viewproject/viewproject.component';
@NgModule({
    declarations: [
    ContractorComponent,
    SlidebarComponent,
    ProfileComponent,
    HeaderComponent,
    ProjectComponent,
    InboxComponent,
    DashboardComponent,
    BidComponent,
    ViewprojectComponent
     
    ],
    imports: [
      CommonModule,
      ContractorRoutingModule,
      ReactiveFormsModule,  // Add ReactiveFormsModule
      FormsModule,
      
    ],
    providers: [ContractorService]
  })
  export class ContractorModule { }