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
  }

  submit(): void {
    this.user.lateReports.push(this.reportFormData);
    sessionStorage.setItem('user', JSON.stringify(this.user));
    this.close('Report was created successfully')
  }

  close(message: string = ''): void {
    this.dialogRef.close(message)
  }
}
