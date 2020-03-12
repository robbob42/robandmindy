import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './components/robandmindy/aboutus/aboutus.component';
import { HistoryComponent } from './components/robandmindy/history/history.component';
import { RobandmindysidenavComponent } from './components/navigation/sidenavs/robandmindysidenav/robandmindysidenav.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { RobsidenavComponent } from './components/navigation/sidenavs/robsidenav/robsidenav.component';
import { CkeditorComponent } from './components/rob/ckeditor/ckeditor.component';


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
  // Rob
  {
    path: 'rob',
    component: RobsidenavComponent,
    children: [
      {
        path: '',
        redirectTo: '/rob/ckeditor',
        pathMatch: 'full'
      },
      {
        path: 'ckeditor',
        component: CkeditorComponent
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
