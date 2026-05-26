import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../classes/card';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card> {
    return this.http.get<Card>(this.apiURL + '/_/items/home?fields=*.*.*&filter[status][in]=published')
      .pipe(retry(1), catchError(this.handleError));
  }

  getImpressum(): Observable<Card> {
    return this.http.get<Card>(this.apiURL + '/_/items/impressum?fields=*.*.*&filter[status][in]=published')
      .pipe(retry(1), catchError(this.handleError));
  }

  getContacts(): Observable<Card> {
    return this.http.get<Card>(this.apiURL + '/_/items/contacts?filter[status][in]=published')
      .pipe(retry(1), catchError(this.handleError));
  }

  getLinks(): Observable<Card> {
    return this.http.get<Card>(this.apiURL + '/_/items/links?filter[status][in]=published')
      .pipe(retry(1), catchError(this.handleError));
  }

  getMembers(): Observable<Card> {
    return this.http.get<Card>(this.apiURL + '/_/items/members?filter[status][in]=published')
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: { error: { message: string }; status: any; message: any }) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
