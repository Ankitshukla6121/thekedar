import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminContractorComponent } from './admin-contractor/admin-contractor.component';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminInboxComponent } from './admin-inbox/admin-inbox.component';
const routes:Routes=[
    { path : 'adminusers' , component:AdminUserComponent},
    { path : 'admincontractors', component:AdminContractorComponent},
    { path : 'home' , component : AdminComponent},
    {path : 'admindashboard' , component: AdminDashboardComponent},
    {path : 'admininbox' , component: AdminInboxComponent},
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AdminRoutingModule{}
