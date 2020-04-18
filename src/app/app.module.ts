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
import { ActivitySliderComponent } from './components/rob/wobertidle/components/activity-slider/activity-slider.component';
import { ActivityButtonComponent } from './components/rob/wobertidle/components/activity-button/activity-button.component';
import { ShopComponent } from './components/rob/wobertidle/components/shop/shop.component';
import { MySidenavComponent } from './components/rob/wobertidle/components/my-sidenav/my-sidenav.component';
import { PulsingTextComponent } from './components/rob/wobertidle/components/pulsing-text/pulsing-text.component';
import { ActivityCardComponent } from './components/rob/wobertidle/components/activity-card/activity-card.component';
import { ImprovementCardComponent } from './components/rob/wobertidle/components/improvement-card/improvement-card.component';
import { ExchangeComponent } from './components/rob/wobertidle/components/exchange/exchange.component';
import { ExchangeCardComponent } from './components/rob/wobertidle/components/exchange-card/exchange-card.component';
import { AccordionActivitiesComponent } from './components/rob/wobertidle/components/accordion-activities/accordion-activities.component';
import { AccordionInventoryComponent } from './components/rob/wobertidle/components/accordion-inventory/accordion-inventory.component';
import { AccordionStatsComponent } from './components/rob/wobertidle/components/accordion-stats/accordion-stats.component';
import { PowersComponent } from './components/rob/wobertidle/components/powers/powers.component';

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
    HomeComponent,
    ActivitySliderComponent,
    ActivityButtonComponent,
    ShopComponent,
    MySidenavComponent,
    PulsingTextComponent,
    ActivityCardComponent,
    ImprovementCardComponent,
    ExchangeComponent,
    ExchangeCardComponent,
    AccordionActivitiesComponent,
    AccordionInventoryComponent,
    AccordionStatsComponent,
    PowersComponent
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
