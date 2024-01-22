import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent {
  user:any;
  classes: any[] = [];
  classFormData: any = {
    candidateCount: 0,
    candidates: []
  }

  constructor(private sharedService: SharedService, private snackbar: MatSnackBar, private dialogRef: MatDialogRef<AddClassComponent>) {
    this.user = this.sharedService.get('user', 'session');
    this.classFormData['facilitator'] = `${this.user?.firstName} ${this.user?.lastName}`;
    this.classFormData['facilitatorEmail'] = this.user?.email;
    this.classes = this.sharedService.get('classes', 'local') || [];
  }

  submit(): void {
    this.classFormData['classId'] = `class-${new Date().getTime()}`;

    if(this.classes.find((_class:any) => _class.className.toLowerCase() === this.classFormData.className.toLowerCase())) {
      this.snackbar.open('Class aready exists', 'Ok', {duration: 3000})
    } else {
      this.classes.push(this.classFormData);
      localStorage.setItem('classes', JSON.stringify(this.classes));
      this.close('Class added successfully')
    }
  }

  close(message:string = ''):void {
    this.dialogRef.close(message)
  }
}
