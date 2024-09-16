import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { userCreationDTO, userDTO, userEditDTO, userLoginDTO } from '../Interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'Users';
  private readonly llaveToken = 'token';

  private idUserActivedSource = new BehaviorSubject<string>('');
  idUserActived$ = this.idUserActivedSource.asObservable();

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

  public update(id: number,user: userEditDTO) {   
    return this.http.put<any>(`${this.apiURL}/${id}`, user, {
      observe: 'response',
    }).pipe(
      catchError(this.handleError)
    );;
  }

  public authenticate(user: userLoginDTO) {
    return this.http
      .post<any>(this.apiURL+"/login", user, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
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

  guardarToken(token: string, id: string, rol: string) {
    localStorage.setItem(this.llaveToken, token);
    localStorage.setItem("ID", id);
    localStorage.setItem("ROLE", rol);
    // this.rolSubject.next(this.obtenerRol());
    this.setUser(id);
  }

  obtenerValueOfStorage(key: string): string {
    const value = localStorage.getItem(key);
    return value ? value : '';
  }

  setUser(id: string): void {
    this.idUserActivedSource.next(id); // Actualiza el BehaviorSubject
    localStorage.setItem('ID', id);
  }

  clearUser(): void {
    this.idUserActivedSource.next(''); // Resetea el BehaviorSubject
    localStorage.removeItem('ID');
    localStorage.removeItem('ROLE');
    localStorage.removeItem(this.llaveToken);
  }
}
