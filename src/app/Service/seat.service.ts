import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';
import { SeatDTO } from '../Interfaces/seat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'Seats';

  public getAllByFlightId(flightId: number): Observable<HttpResponse<SeatDTO[]>> {
    return this.http.get<SeatDTO[]>(this.apiURL + '/by-flight-id/' + flightId, {
      observe: 'response',
    });
  }

  public getAllByFlightNumber(flightNumber: number): Observable<HttpResponse<SeatDTO[]>> {
    return this.http.get<SeatDTO[]>(this.apiURL + '/by-flight-id/' + flightNumber, {
      observe: 'response',
    });
  }
}
