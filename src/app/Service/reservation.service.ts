import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';
import { ReservationCreationDTO } from '../Interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'Reservations';

  public create(reservation: ReservationCreationDTO) {    
    return this.http.post<any>(this.apiURL, reservation, {
      observe: 'response',
    })
  }    
}
