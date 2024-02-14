import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  loggedInUser!: string;

  getUser() {
    return this.loggedInUser;
  }

  setUser(email: string) {
    this.loggedInUser = email;
  }

  login(email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwvhi6doLjJLtIB05D7LeRuHbu6G0NP1E',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  signup(email: string, password: string): Observable<any> {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwvhi6doLjJLtIB05D7LeRuHbu6G0NP1E',
        {
          email: email,
          password: password,
          displayName: 'faozyBG',
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }
}
