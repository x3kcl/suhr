import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFile(id: string): Observable<File> {
    return this.http.get<File>(`${this.apiURL}/_/files/${encodeURIComponent(id)}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getFiles(): Observable<File> {
    return this.http.get<File>(this.apiURL + '/_/files?filter[tags][in]=fotos')
      .pipe(retry(1), catchError(this.handleError));
  }

  getDocuments(): Observable<File> {
    return this.http.get<File>(this.apiURL + '/_/files?filter[tags][in]=documents')
      .pipe(retry(1), catchError(this.handleError));
  }

  getStatistics(): Observable<File> {
    return this.http.get<File>(this.apiURL + '/_/files?filter[tags][in]=statistics')
      .pipe(retry(1), catchError(this.handleError));
  }

  getPicked(): Observable<File> {
    return this.http.get<File>(this.apiURL + '/_/files?filter[tags][in]=picked')
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
