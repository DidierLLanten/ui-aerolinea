export interface userDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: string;
  reservations: string;
}

export interface userCreationDTO {  
  FirstName?: string;
  LastName?: string;
  Email?: string;
  PasswordHash?: string | null;   
}

export interface userEditDTO {  
  FirstName?: string;
  LastName?: string;
}
