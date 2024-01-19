import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  mainClass: any;
  activeLink: number = 0;
  menuItems: any[] = [
    {name: 'View Candidates', route: '/home/candidate'},
    {name: 'View Late Comers', route: '/home/late-report'},
  ]

  constructor(private sharedService: SharedService) {
    this.mainClass = this.sharedService.get('class', 'session');
    console.log(this.mainClass)
  }
}
