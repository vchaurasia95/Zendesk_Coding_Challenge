import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseUrl = environment['apiBase'];

  private ticketsAPI = "/tickets";
  private apiUrl = this.baseUrl + this.ticketsAPI;

  constructor(private httpClient: HttpClient) { }

  public getTickets(page?: string) {
    let finalURl = this.apiUrl;
    if (page)
      finalURl = finalURl +`/${page}`;
    return this.httpClient.get(finalURl);
  }
}
