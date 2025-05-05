import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

// Lazy loading of the contractor module
const routes: Routes = [
  { path: '', component: HomeComponent },  // Route for the home page
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },
  {
    path :'user',
    loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)
  },
  {
    path:'contractor',
    loadChildren:()=>import('./contractor/contractor.module').then(m=>m.ContractorModule)
  },
  { path: '**', redirectTo: '' }  // Redirect unmatched paths to HomeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
