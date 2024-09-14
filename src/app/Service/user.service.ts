import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { userCreationDTO, userDTO } from '../Interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'Users';

  public getAll(): Observable<HttpResponse<userDTO[]>> {
    return this.http.get<userDTO[]>(this.apiURL, {
      observe: 'response',
    });
  }

  public create(user: userCreationDTO) {
    return this.http
      .post<any>(this.apiURL, user, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  public delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.apiURL + '/' + id, {
      observe: 'response',
    });
  }

  public getById(id: number): Observable<HttpResponse<userDTO>> {
    return this.http.get<userDTO>(this.apiURL + '/' + id, {
      observe: 'response',
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (
        error.status === 500 &&
        error.error.includes('Cannot insert duplicate key row')
      ) {
        errorMessage = 'Email duplicate';
      } else {
        errorMessage = `Server-side error: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}
