import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { TicketService } from './services/ticket.service';


export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}


describe('AppComponent', () => {
  let component: AppComponent;
  let service: TicketService;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        TicketService
      ],

    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TicketService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should test handlePageEvent when remdata > 25', () => {
    spyOn(component, 'handlePageEvent').and.callThrough();
    component.handlePageEvent({ length: 100, pageIndex: 3, pageSize: 25 });
    expect(component.handlePageEvent).toHaveBeenCalled();
  });

  it('should test handlePageEvent when remdata < = 25 ', () => {
    component.hasNextPage = true;
    component.dataSource = new MatTableDataSource([]);
    spyOn(component, 'handlePageEvent').and.callThrough();
    spyOn(service, 'getTickets').and.callFake(() => {
      return of({
        "tickets": [],
        "next_page": 'https://zccticket-viewer-vishal-ub.zendesk.com/api/v2/tickets.json?page=1'
      })
    });
    component.handlePageEvent({ length: 100, pageIndex: 4, pageSize: 20 });
    fixture.detectChanges();
    expect(component.handlePageEvent).toHaveBeenCalled();
    expect(service.getTickets).toHaveBeenCalled();
  });

  it('should test handlePageEvent when nextPage:null', () => {
    component.hasNextPage = true;
    component.dataSource = new MatTableDataSource([]);
    spyOn(component, 'handlePageEvent').and.callThrough();
    spyOn(service, 'getTickets').and.callFake(() => {
      return of({
        "tickets": [],
        "next_page": null
      })
    });
    component.handlePageEvent({ length: 100, pageIndex: 4, pageSize: 20 });
    fixture.detectChanges();
    expect(component.handlePageEvent).toHaveBeenCalled();
    expect(service.getTickets).toHaveBeenCalled();
  });

  it('should test handlePageEvent when API status == 400', () => {
    component.hasNextPage = true;
    component.dataSource = new MatTableDataSource([]);
    spyOn(component, 'handlePageEvent').and.callThrough();
    spyOn(service, 'getTickets').and.callFake(() => {
      return throwError({
        "status": 400,
        "error": {
          "message": "Test Error"
        }
      });
    });
    component.handlePageEvent({ length: 100, pageIndex: 4, pageSize: 20 });
    fixture.detectChanges();
    expect(component.handlePageEvent).toHaveBeenCalled();
    expect(service.getTickets).toHaveBeenCalled();
  });

});
