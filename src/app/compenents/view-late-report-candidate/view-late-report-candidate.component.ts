import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddLateReportComponent } from 'src/app/popups/add-late-report/add-late-report.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-late-report-candidate',
  templateUrl: './view-late-report-candidate.component.html',
  styleUrls: ['./view-late-report-candidate.component.scss']
})
export class ViewLateReportCandidateComponent {
  currentUser: any;
  lateReports:any[] = [];
  statuses:string[] = ['late', 'arrived', 'absent']
  displayedColumns: string[] = ['reportId', 'createdBy', 'timeEstimate', 'dateCreated', 'reason', 'arrivalTime', 'updatedBy', 'changeStatus'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sharedService: SharedService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    this.updateUser();
  }

  updateUser():void {
    this.currentUser = this.sharedService.get('user', 'session');
    this.lateReports = this.sharedService.get('lateReports', 'local') || [];
    this.lateReports = this.lateReports.filter((report:any) => report.createdByEmail.toLowerCase() === this.currentUser.email.toLowerCase())

    // Assign the candidates to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.lateReports);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addReport() {
    const dialogRef = this.dialog.open(AddLateReportComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.updateUser();
        this.snackbar.open(result, 'Ok', {duration: 3000});
      }
    });
  }

  statusUpdate(status: string, reportId:string): void {
    this.lateReports.forEach((report:any, indx: number) => {
      if(report.reportId === reportId) {
        if(status === 'arrived') {
          this.lateReports[indx]['arrivalTime'] = this.sharedService.getTimeFromDate(new Date());
        }
        this.lateReports[indx]['status'] = status;
        this.lateReports[indx]['updatedBy'] = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
      }
    });

    localStorage.setItem('lateReports', JSON.stringify(this.lateReports));
    this.updateUser();
  }
}
