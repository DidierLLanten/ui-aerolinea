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
  flightNumber?: string | null;
  airline?: string | null;
  departureDate?: Date | null;
  arrivalDate?: Date | null;
  departureTime?: Date | null;
  arrivalTime?: Date | null;
  destination?: string | null;
  origin?: string | null;
  price?: number | null;
  totalSeats?: number | null;
}

export interface flightCreationDTO2 {
  flightNumber?: string | null;
  airline?: string | null;  
  departureTime?: string | null;
  arrivalTime?: string | null;
  destination?: string | null;
  origin?: string | null;
  price?: number | null;
  totalSeats?: number | null;
}

