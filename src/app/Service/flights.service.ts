import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { flightDTO } from '../Interfaces/flight';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'Flights';

  public getAll(): Observable<HttpResponse<flightDTO[]>> {
    return this.http.get<flightDTO[]>(this.apiURL, {
      observe: 'response',
    });
  }

  public delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.apiURL + '/' + id, {
      observe: 'response',
    });
  }

  public getById(id: number): Observable<HttpResponse<flightDTO>> {
    return this.http.get<flightDTO>(this.apiURL + '/' + id, {
      observe: 'response',
    });
  }
}
