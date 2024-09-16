import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';
import { ReservationCreationDTO, ReservationDTO } from '../Interfaces/reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'Reservations';

  public getAll(): Observable<HttpResponse<ReservationDTO[]>> {
    return this.http.get<ReservationDTO[]>(this.apiURL, {
      observe: 'response',
    });
  }

  public create(reservation: ReservationCreationDTO) {    
    return this.http.post<any>(this.apiURL, reservation, {
      observe: 'response',
    })
  }
  
  public delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.apiURL + '/' + id, {
      observe: 'response',
    });
  }
}
