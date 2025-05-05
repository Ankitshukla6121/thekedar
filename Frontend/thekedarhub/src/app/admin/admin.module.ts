import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './admin.service';
import { AdminContractorComponent } from './admin-contractor/admin-contractor.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { AdminComponent } from './admin.component';
import { AdminInboxComponent } from './admin-inbox/admin-inbox.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
@NgModule({
  declarations: [
    AdminContractorComponent,
    AdminUserComponent,
    SlidebarComponent,
    AdminComponent,
    AdminInboxComponent,
    AdminDashboardComponent
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,  // Add ReactiveFormsModule
 
    FormsModule,
    
  ],
  providers: [AdminService]
})
export class AdminModule { }
