import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './compenents/page-not-found/page-not-found.component';
import { SignInComponent } from './compenents/sign-in/sign-in.component';
import { SignUpComponent } from './compenents/sign-up/sign-up.component';
import { LandingComponent } from './compenents/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './compenents/home/home.component';
import { ViewCandidatesComponent } from './compenents/view-candidates/view-candidates.component';
import { ViewLateReportComponent } from './compenents/view-late-report/view-late-report.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'home', redirectTo: '/home/candidate', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'candidate', component: ViewCandidatesComponent },
      { path: 'late-report', component: ViewLateReportComponent },
    ]
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
