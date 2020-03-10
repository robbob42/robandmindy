import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


const routes: Routes = [
  {
    path: 'Dashboard',
    component: DashboardComponent
  },
  { path: '',
    redirectTo: '/Dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
