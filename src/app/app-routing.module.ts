import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './components/robandmindy/aboutus/aboutus.component';
import { HistoryComponent } from './components/robandmindy/history/history.component';
import { RobandmindysidenavComponent } from './components/navigation/sidenavs/robandmindysidenav/robandmindysidenav.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: '',
    redirectTo: '/robandmindy/aboutus',
    pathMatch: 'full'
  },
  // Side Navs
  // RobAndMindy
  {
    path: 'robandmindy',
    component: RobandmindysidenavComponent,
    children: [
      {
        path: '',
        redirectTo: '/robandmindy/aboutus',
        pathMatch: 'full'
      },
      {
        path: 'aboutus',
        component: AboutusComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      }
    ]
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
