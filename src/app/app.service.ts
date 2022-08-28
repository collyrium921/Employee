import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url:string="http://localhost:3000/employeeList"
  constructor(private http:HttpClient) { }
  getList(): Observable<any> {
    return this.http.get(this.url)
  }

  deleteCompany(emp:any): Observable<any>{
    return this.http.delete(this.url+'/'+emp.id).pipe(catchError(this.handleError))
  }
  
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
