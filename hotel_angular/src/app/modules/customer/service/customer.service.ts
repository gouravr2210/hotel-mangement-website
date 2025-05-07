import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { UserStorageService } from 'src/app/auth/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  bookRoom(bookingDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/customer/book", bookingDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Booking posted successfully')),
        catchError(this.handleError<[]>('Error posting Room', []))
      );
  }

  getRooms(pageNumber: number): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/customer/rooms/${pageNumber}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Rooms fetched successfully')),
        catchError(this.handleError<[]>('Error fetching Rooms', []))
      );
  }

  getMyBookings(pageNumber: number): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/customer/bookings/${UserStorageService.getUserId()}/${pageNumber}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Bookings fetched successfully')),
        catchError(this.handleError<[]>('Error fetching Bookings', []))
      );
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
