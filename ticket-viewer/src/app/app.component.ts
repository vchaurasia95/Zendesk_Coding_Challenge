import { ThrowStmt } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TicketDialogComponent } from './components/ticket-dialog/ticket-dialog.component';
import { TicketService } from './services/ticket.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private errorConfig: MatSnackBarConfig = {
    horizontalPosition: "center",
    verticalPosition: "bottom",
    duration: 3000,
    panelClass: 'error-dialog'
  }

  private errorMessages = {
    '403': "Could Not Autheticate you, Please Try Again Later!",
    '404': "Resource Not Found, Try Again Later",
    '500': "Some error occured, Please Try Again later"
  }

  displayedColumns: string[] = ['id', 'subject', 'status', 'created_at'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  private _hasNextPage: boolean = false;
  public get hasNextPage(): boolean {
    return this._hasNextPage;
  }
  public set hasNextPage(value: boolean) {
    this._hasNextPage = value;
  }
  private nextPage: string = '-1';

  constructor(private ticketService: TicketService, private _snackBar: MatSnackBar, private dialog: MatDialog) {
    this.ticketService.getTickets().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data['tickets']);
      this.dataSource.paginator = this.paginator;
      if (data['next_page'] != null) {
        this._hasNextPage = true;
        let searchParam = new URL(data['next_page']).searchParams;
        this.nextPage = searchParam.get('page');
      }
    }, (err) => {
      this.handleError(err);
    });
  }
  handleError(err: any) {
    this._snackBar.open(this.errorMessages[err.status], '', this.errorConfig);
  }

  openDialog(row): void {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '900px',
      height: '200px',
      data: row,
    });
  }

  ngAfterViewInit() {
  }


  handlePageEvent(pageEvent: any) {
    const remainingDataCount = pageEvent.length - (pageEvent.pageIndex * pageEvent.pageSize);
    if (this.hasNextPage && remainingDataCount <= 25) {
      this.ticketService.getTickets(this.nextPage).subscribe((newPagedata) => {
        this.dataSource.data = (this.dataSource.data.concat(newPagedata['tickets']));
        this.dataSource.paginator = this.paginator;
        if (newPagedata['next_page'] != null) {
          this.hasNextPage = true;
          this.nextPage = new URLSearchParams(newPagedata['next_page']).get('page');
        }
        else {
          this._hasNextPage = false;
        }
        this.table.renderRows();
      }, (err) => {
        this.handleError(err);
      });
    }
  }

}
