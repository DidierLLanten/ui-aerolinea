import { SeatDTO } from './seat';

export interface ReservationCreationDTO {
  userId?: number;
  flightId?: number;
  numberOfPassengers?: number;
  seatsId?: number[] | null;
}

export interface ReservationDTO {
  id: number;
  reservationDate: Date;
  numberOfPassengers: number;
  userId: number;
  flightId: number;
  seats: SeatDTO[] | null;
}
