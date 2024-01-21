import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: any;
  mainClass: any;
  activeLink: number = 0;
  menuItems: any[] = [];

  constructor(private sharedService: SharedService, private router: Router) {
    this.user = this.sharedService.get('user', 'session');
    this.mainClass = this.sharedService.get('class', 'session');

    if (this.user.role === 'candidate') {
      // Candidate
      this.menuItems = [
        { name: 'View Late Report', route: '/candidate/late-report-candidate' },
      ]
    } else {
      // Facilitator
      this.menuItems = [
        { name: 'View Candidates', route: '/facilitator/candidate' },
        { name: 'View Late Comers', route: '/facilitator/late-report' },
      ]
    }

    this.listenToRouteChanges();
  }

  listenToRouteChanges():void {
    // Navigate to a specific element when route changes
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.menuItems.forEach((item: any, indx:number) => {
          if(item.route === event.url) {
            this.activeLink = indx;
          }
        })
      }
    })
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/sign-in']);
  }
}
