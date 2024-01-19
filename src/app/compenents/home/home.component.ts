import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    } else if (this.user.role === 'facilitator') {
      // Facilitator
      this.menuItems = [
        { name: 'View Candidates', route: '/facilitator/candidate' },
        { name: 'View Late Comers', route: '/facilitator/late-report' },
      ]
    } else {
      // Admin
      this.menuItems = [
        { name: 'View Candidates', route: '/admin/candidate' },
        { name: 'View Late Comers', route: '/admin/late-report' },
      ]
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/sign-in']);
  }
}
