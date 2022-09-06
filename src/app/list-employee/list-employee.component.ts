import {  Component } from '@angular/core'
import {
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog'
import { AppService } from '../app.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { LiveAnnouncer } from '@angular/cdk/a11y'
import {  Sort } from '@angular/material/sort'
import { IEmployee } from '../interfaces/employee'
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
})
export class ListEmployeeComponent {
  //variable declaration
  displayedColumns: string[] = [
    'Company Name',
    'Email',
    'Phone Number',
    'Action',
  ]
  employee: IEmployee[] = [];


  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    private snackBar: MatSnackBar,
    private liveAnnouncer: LiveAnnouncer,
  ) {
    //show list of companies on the screen initally
    this.listCompanies()
  }

  //function to call list of Companies
  listCompanies() {
    this.appService.getList().subscribe((data) => {
      this.employee = data
    })
  }


  //function to show confirmation dialog and delete the company on confirmation
  deleteCompany(emp: IEmployee) {
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

  //function to sort the data in the table
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this.liveAnnouncer.announce('Sorting cleared')
    }
  }
}


// delete confirmation box html
@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialogue.html',
})
export class ConfirmationDialogue {
  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogue>,
  ) {}
  onConfirmClick(): void {
    this.dialogRef.close(true)
  }
}
