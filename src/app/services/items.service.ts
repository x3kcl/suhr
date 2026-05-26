import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Item } from '../classes/item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItem(name: string, id: string, idname: string): Observable<Item> {
    const url = `${this.apiURL}/_/items/${encodeURIComponent(name)}?fields=*.*.*&filter[status][in]=published` +
      `&filter[${encodeURIComponent(idname)}_id][in]=${encodeURIComponent(id)}`;
    return this.http.get<Item>(url).pipe(retry(1), catchError(this.handleError));
  }

  getItems(name: string): Observable<Item> {
    return this.http.get<Item>(
      `${this.apiURL}/_/items/${encodeURIComponent(name)}?fields=*.*.*&filter[status][in]=published`
    ).pipe(retry(1), catchError(this.handleError));
  }

  getDocument(id: string): Observable<Item> {
    return this.http.get<Item>(
      `${this.apiURL}/_/items/document?fields=*.*.*&filter[status][in]=published&filter[documents_id][in]=${encodeURIComponent(id)}`
    ).pipe(retry(1), catchError(this.handleError));
  }

  getDocuments(): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/documents?filter[status][in]=published')
      .pipe(retry(1), catchError(this.handleError));
  }

  getFoto(id: string): Observable<Item> {
    return this.http.get<Item>(
      `${this.apiURL}/_/items/foto?fields=*.*.*&filter[status][in]=published&filter[fotos_id][in]=${encodeURIComponent(id)}`
    ).pipe(retry(1), catchError(this.handleError));
  }

  getFotos(): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/fotos?filter[status][in]=published')
      .pipe(retry(1), catchError(this.handleError));
  }

  getGelesen(id: string): Observable<Item> {
    return this.http.get<Item>(
      `${this.apiURL}/_/items/gelesen?fields=*.*.*&filter[status][in]=published&filter[gelesenes_id][in]=${encodeURIComponent(id)}`
    ).pipe(retry(1), catchError(this.handleError));
  }

  getGelesenes(): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/gelesenes?filter[status][in]=published')
      .pipe(retry(1), catchError(this.handleError));
  }

  getStatistic(id: string): Observable<Item> {
    return this.http.get<Item>(
      `${this.apiURL}/_/items/statistic?fields=*.*.*&filter[status][in]=published&filter[statistics_id][in]=${encodeURIComponent(id)}`
    ).pipe(retry(1), catchError(this.handleError));
  }

  getStatistics(): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/_/items/statistics?filter[status][in]=published')
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
