import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStorageService } from 'src/app/auth/services/storage/user-storage.service';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,) { }

  postRoomDetails(roomDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/admin/room", roomDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Room posted successfully')),
        catchError(this.handleError<[]>('Error posting Room', []))
      );
  }

  updateRoomDetails(id: number, roomDto: any): Observable<any> {
    return this.http
      .put<[]>(BASIC_URL + `api/admin/room/${id}`, roomDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Room updated successfully')),
        catchError(this.handleError<[]>('Error updating Room', []))
      );
  }

  getRoomById(id: number): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/room/${id}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Room fetched successfully')),
        catchError(this.handleError<[]>('Error fetching Room', []))
      );
  }

  getRooms(pageNumber: number): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/rooms/${pageNumber}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Rooms fetched successfully')),
        catchError(this.handleError<[]>('Error fetching Rooms', []))
      );
  }

  getReservations(pageNumber: number): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/reservations/${pageNumber}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Reservations fetched successfully')),
        catchError(this.handleError<[]>('Error fetching Reservations', []))
      );
  }

  changeReservationStatus(reservationId: number, status: string): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/reservation/${reservationId}/${status}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Reservation status updated successfully')),
        catchError(this.handleError<[]>('Error updating Reservation status.', []))
      );
  }

  deleteRoom(roomId: any): Observable<any> {
    return this.http
      .delete<[]>(BASIC_URL + `api/admin/room/${roomId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Room Deleted successfully')),
        catchError(this.handleError<[]>('Error Deleting room', []))
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
