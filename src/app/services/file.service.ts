import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  apiURL = 'https://cms.naumann.hosting';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
    // HttpClient API get() method => Fetch employees list
  getFiles(): Observable<File> {
      return this.http.get<File>(this.apiURL + '/_/files?filter[tags][in]=fotos')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getDocuments(): Observable<File> {
    return this.http.get<File>(this.apiURL + '/_/files?filter[tags][in]=documents')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getStatistics(): Observable<File> {
    return this.http.get<File>(this.apiURL + '/_/files?filter[tags][in]=statistics')
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
