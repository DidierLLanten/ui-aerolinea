export interface userDTO {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  PasswordHash: string;
  Role: string;
  Reservations: string;
}

export interface userCreationDTO {  
  FirstName?: string;
  LastName?: string;
  Email?: string;
  PasswordHash?: string | null;   
}
