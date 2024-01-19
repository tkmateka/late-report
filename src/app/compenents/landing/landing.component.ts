import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddClassComponent } from 'src/app/popups/add-class/add-class.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  user: any = null;
  classes: any[] = [];

  constructor(private sharedService: SharedService, private dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) {
    this.user = this.sharedService.get('user', 'session');
    this.updateClasses();
  }

  addClass() {
    const dialogRef = this.dialog.open(AddClassComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.updateClasses();
        this.snackbar.open(result, 'Ok', {duration: 3000});
      }
    });
  }

  updateClasses():void {
    this.classes = this.sharedService.get('classes', 'local') || [];
  }

  goTo(_class:any):void {
    sessionStorage.setItem('class', JSON.stringify(_class));
    this.router.navigate(['/home/candidate'])
  }
}
