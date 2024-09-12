export interface flightDTO {
  id: number;
  flightNumber: string;
  airline: string;
  departureTime: Date;
  arrivalTime: Date;
  availableSeats: number;
  destination: string;
  origin: string;
  price: number;
  totalSeats: number;
}

export interface flightCreationDTO {
  flightNumber: string;
  airline: string;
  departureTime: Date;
  arrivalTime: Date;
  availableSeats: number;
  destination: string;
  origin: string;
  price: number;
  totalSeats: number;
}
