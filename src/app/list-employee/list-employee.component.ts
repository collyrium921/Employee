import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import employeeList from '../employeeList.json'
import { Inject } from '@angular/core'
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { HttpClient } from '@angular/common/http'
import { AppService } from '../app.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { MatSort, Sort } from '@angular/material/sort'
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
})
export class ListEmployeeComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'Company Name',
    'Email',
    'Phone Number',
    'Action',
  ]
  employee: any
  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    private snackBar: MatSnackBar,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.listCompanies()
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit() {
    this.employee.paginator = this.paginator
    this.employee.sort = this.sort;
  }

  listCompanies() {
    this.appService.getList().subscribe((data) => {
      this.employee = data
    })
  }

  openDialog(i: number, emp: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogue, {})
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.appService.deleteCompany(emp).subscribe((res) => {
          this.listCompanies()
          this.snackBar.open('Delete successful', 'Close', {
            duration: 1000,
            panelClass: ['snack-notification'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
        })
      }
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialogue.html',
})
export class ConfirmationDialogue {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogue>,
  ) {}
  onConfirmClick(): void {
    this.dialogRef.close(true)
  }
}
