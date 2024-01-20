import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-late-report',
  templateUrl: './view-late-report.component.html',
  styleUrls: ['./view-late-report.component.scss']
})
export class ViewLateReportComponent {
  currentUser: any;
  lateReports:any[] = [];
  displayedColumns: string[] = ['reportId', 'createdBy', 'timeEstimate', 'dateCreated', 'arrivalTime', 'updatedBy', 'changeStatus'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sharedService: SharedService) {
    this.currentUser = this.sharedService.get('user', 'session');
    this.updateReports();
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

  statusUpdate(status: string, reportId:string): void {
    this.lateReports.forEach((report:any, indx: number) => {
      if(report.reportId === reportId) {
        this.lateReports[indx]['status'] = status;
        this.lateReports[indx]['updatedBy'] = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
        localStorage.setItem('lateReports', JSON.stringify(this.lateReports));
      }
    });

    this.updateReports();
  }

  updateReports():void {
    this.lateReports = this.sharedService.get('lateReports', 'local') || [];
    // Assign the candidates to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.lateReports);
  }
  
}
