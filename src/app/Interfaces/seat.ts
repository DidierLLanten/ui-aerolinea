export interface SeatDTO {
  id?: number;
  flightId?: number;
  seatNumber: string;
  isAvailable: boolean;
  reservationId: number | null;
}
