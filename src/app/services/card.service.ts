import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../classes/card';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  apiURL = 'https://cms.naumann.hosting';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // HttpClient API get() method => Fetch employees list
  getCards(): Observable<Card> {
    return this.http.get<Card>(this.apiURL + '/_/items/home')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getContacts(): Observable<Card> {
    return this.http.get<Card>(this.apiURL + '/_/items/contacts')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getLinks(): Observable<Card> {
    return this.http.get<Card>(this.apiURL + '/_/items/links')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
