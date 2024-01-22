import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-late-report',
  templateUrl: './add-late-report.component.html',
  styleUrls: ['./add-late-report.component.scss']
})
export class AddLateReportComponent {
  user:any;
  currentClass: any;
  lateReports:any[] = [];
  reportFormData: any = {
    reportId: 'report-' + new Date().getTime(),
    timeEstimate: '',
    dateCreated: new Date(),
    arrivalTime: '',
    updatedBy: '',
    status: 'late'
  }

  constructor(private sharedService: SharedService, private dialogRef: MatDialogRef<AddLateReportComponent>) {
    this.user = this.sharedService.get('user', 'session');
    this.currentClass = this.sharedService.get('class', 'session');
    this.lateReports = this.sharedService.get('lateReports', 'local') || [];
  }

  submit(): void {
    this.reportFormData['classId'] = this.currentClass.classId;
    this.reportFormData['createdBy'] = `${this.user.firstName} ${this.user.lastName}`;
    this.reportFormData['createdByEmail'] = this.user.email;
    this.lateReports.push(this.reportFormData);
    localStorage.setItem('lateReports', JSON.stringify(this.lateReports));
    this.close('Report was created successfully')
  }

  close(message: string = ''): void {
    this.dialogRef.close(message)
  }
}
