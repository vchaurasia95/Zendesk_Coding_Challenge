import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TicketService } from '../services/ticket.service';

import { HeaderInterceptor } from './header.interceptor';

describe('HeaderInterceptor', () => {
  let httpController: HttpTestingController;
  let service: TicketService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HeaderInterceptor,
        multi: true
      }
      ]
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TicketService);
  });
  afterEach(() => {
    httpController.verify();
  })

  it('should add http ADD HTTP error created', () => {
    service.getTickets().subscribe((resp) => {
      expect(resp).toBeTruthy();
    });
    const httpRequest = httpController.expectOne(environment['apiBase'] + "/tickets");
    httpRequest.flush({
      data: 'test'
    });
    expect(httpRequest.request.headers.get('Content-Type')).toBe('application/json');
  });
});
