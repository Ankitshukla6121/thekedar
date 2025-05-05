import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { InboxComponent } from './inbox/inbox.component';
import { ProjectComponent } from './project/project.component';
const routes:Routes=[
   {path:'home', component:UserComponent},
   {path:'userdashboard', component:DashboardComponent},
   {path :'userprofile' , component:ProfileComponent},
   {path : 'userinbox' , component:InboxComponent},
   {path : 'userproject', component:ProjectComponent}
   
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class UserRoutingModule{}
