import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractorComponent } from './contractor.component';
import { ProjectComponent } from './project/project.component';
import { InboxComponent } from './inbox/inbox.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
const routes:Routes=[
    {path:'home', component:ContractorComponent},
    {path:'projects', component:ProjectComponent},
    {path:'inbox' , component:InboxComponent},
    {path :'profile',component:ProfileComponent},
    {path :'dashboard',component:DashboardComponent}
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class ContractorRoutingModule{}
