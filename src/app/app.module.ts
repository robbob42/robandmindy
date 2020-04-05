import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AboutusComponent } from './components/robandmindy/aboutus/aboutus.component';
import { RobandmindysidenavComponent } from './components/navigation/sidenavs/robandmindysidenav/robandmindysidenav.component';
import { HistoryComponent } from './components/robandmindy/history/history.component';
import { RobsidenavComponent } from './components/navigation/sidenavs/robsidenav/robsidenav.component';
import { CkeditorComponent } from './components/rob/ckeditor/ckeditor.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './components/rob/wobertidle/components/layout/layout.component';
import { HomeComponent } from './components/rob/wobertidle/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    PagenotfoundComponent,
    AboutusComponent,
    RobandmindysidenavComponent,
    HistoryComponent,
    RobsidenavComponent,
    CkeditorComponent,
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    CKEditorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
