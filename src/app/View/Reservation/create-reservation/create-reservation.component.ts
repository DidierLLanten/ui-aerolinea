import { HttpResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { ReservationCreationDTO } from 'src/app/Interfaces/reservation';
import { SeatDTO } from 'src/app/Interfaces/seat';
import { ReservationService } from 'src/app/Service/reservation.service';
import { SeatService } from 'src/app/Service/seat.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css'],
})
export class CreateReservationComponent implements OnInit,OnChanges{
  constructor(private reservationService: ReservationService, private seatService: SeatService,private rotuer: Router, private activedRoute: ActivatedRoute) {}

  flightId: number = 0;
  abc?: SeatDTO[];
  formattedSeats : SeatDTO[][] =[];
  isLoading = true;
  createReservation?: ReservationCreationDTO;
  selectedSeats: SeatDTO[] = [];

  ngOnInit(): void {
    this.activedRoute.params.subscribe((parametros) => {
      this.flightId = parametros['id'];
      this.loadRecords(this.flightId)
    });
    // throw new Error('Method not implemented.');
    this.createReservation = {
      userId : 20
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges")
    console.log(changes)    
  }

  loadRecords(flightId: number) {
    this.isLoading = true;
    this.seatService
      .getAllByFlightId(flightId)
      .pipe(delay(1000))
      .subscribe((response: HttpResponse<SeatDTO[]>) => {        
        this.formattedSeats = this.formatSeats(response.body ?? []);
        this.isLoading = false;
      });
  }

  formatSeats(loadedSeats: SeatDTO[]){      
    const seats: SeatDTO[][] = [];
    if (loadedSeats) {
      let fila: SeatDTO[] = [];
      for (let index = 0; index < loadedSeats.length; index++) {
        if (index % 4 == 0) {
          fila = [];
          seats.push(fila);
        }
        fila.push(loadedSeats[index]);
      }
    }
    return seats.reverse();
  }

  create(){
    console.log(this.selectedSeats)    
    if (this.createReservation) {
      this.createReservation.flightId =this.selectedSeats[0].flightId;
      this.createReservation.numberOfPassengers =this.selectedSeats.length;
      this.createReservation.seatsId = this.selectedSeats.filter(seat => seat.id !== undefined).map(seat => seat.id as number);

      this.reservationService.create(this.createReservation).subscribe((response) => {
        this.loadRecords(this.flightId);
      });
    } else {
      console.error("Reservation is null, cannot send request.");
    }
  }

  toggleSeat(seat: SeatDTO) {
    if (seat.isAvailable) {      
      const index = this.selectedSeats.indexOf(seat);      
      if (index === -1) {
        this.selectedSeats.push(seat); // Añade el asiento al array de asientos seleccionados
      } else {
        this.selectedSeats.splice(index, 1); // Elimina el asiento del array de asientos seleccionados
      }
    }
  }
}
