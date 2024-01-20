import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './compenents/sign-in/sign-in.component';
import { SignUpComponent } from './compenents/sign-up/sign-up.component';
import { PageNotFoundComponent } from './compenents/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './compenents/landing/landing.component';
import { AddClassComponent } from './popups/add-class/add-class.component';
import { HomeComponent } from './compenents/home/home.component';
import { ViewCandidatesComponent } from './compenents/view-candidates/view-candidates.component';
import { ViewLateReportComponent } from './compenents/view-late-report/view-late-report.component';
import { ViewLateReportCandidateComponent } from './compenents/view-late-report-candidate/view-late-report-candidate.component';
import { AddLateReportComponent } from './popups/add-late-report/add-late-report.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent,
    LandingComponent,
    AddClassComponent,
    HomeComponent,
    ViewCandidatesComponent,
    ViewLateReportComponent,
    ViewLateReportCandidateComponent,
    AddLateReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
