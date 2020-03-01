import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Item } from '../classes/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  apiURL = 'https://cms.naumann.hosting';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getItem(name, id, idname): Observable<Item> {
    return this.http.get<Item>(
      this.apiURL + '/_/items/' +
      name + '?fields=*.*.*&filter[status][in]=published&filter[' +
      idname + '_id][in]=' + id + '')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getItems(name): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/' + name + '?fields=*.*.*&filter[status][in]=published')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getDocument(id): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/document?fields=*.*.*&filter[status][in]=published&filter[documents_id][in]=' + id + '')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getDocuments(): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/documents?filter[status][in]=published')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getFoto(id): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/foto?fields=*.*.*&filter[status][in]=published&filter[fotos_id][in]=' + id + '')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getFotos(): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/fotos?filter[status][in]=published')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getGelesen(id): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/gelesen?fields=*.*.*&filter[status][in]=published&filter[gelesenes_id][in]=' + id + '')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getGelesenes(): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/gelesenes?filter[status][in]=published')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getStatistic(id): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/statistic?fields=*.*.*&filter[status][in]=published&filter[statistics_id][in]=' + id + '')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getStatistics(): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/statistics?filter[status][in]=published')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
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
