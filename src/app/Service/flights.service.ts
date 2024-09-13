import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { flightCreationDTO, flightDTO, flightEditDTO } from '../Interfaces/flight';

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

  public create(flight: flightCreationDTO) {    
    return this.http.post<any>(this.apiURL, flight, {
      observe: 'response',
    }).pipe(
      catchError(this.handleError)
    );;
  }

  public getById(id: number): Observable<HttpResponse<flightDTO>> {
    return this.http.get<flightDTO>(this.apiURL + '/' + id, {
      observe: 'response',
    });
  }

  public update(id: number,flight: flightEditDTO) {   
    return this.http.put<any>(`${this.apiURL}/${id}`, flight, {
      observe: 'response',
    }).pipe(
      catchError(this.handleError)
    );;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 500 && error.error.includes('Cannot insert duplicate key row')) {
        errorMessage = 'A flight with this number already exists.';
      } else {
        errorMessage = `Server-side error: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}
