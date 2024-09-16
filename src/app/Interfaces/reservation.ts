export interface ReservationCreationDTO {
  userId?: number;
  flightId?: number;
  numberOfPassengers?: number;
  seatsId?: number[] | null;
}
