import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

export interface User {
  email: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private arrayOfScores: any[] = [];

  loggedInUser: User = {
    email: '',
    displayName: '',
  };

  getUser() {
    return this.loggedInUser;
  }

  setUser(displayName: string, email: string) {
    this.loggedInUser.displayName = displayName;
    this.loggedInUser.email = email;

    console.log(this.loggedInUser);
  }

  login(email: string, password: string): Observable<any> {
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
          // console.log(error);
          return throwError(error);
        })
      );
  }

  signup(
    email: string,
    password: string,
    displayName: string
  ): Observable<any> {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwvhi6doLjJLtIB05D7LeRuHbu6G0NP1E',
        {
          email: email,
          password: password,
          displayName: displayName,
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

  storeScoreInDB(displayName: string, score: string) {
    this.http
      .post(
        'https://quiz-app-d3777-default-rtdb.firebaseio.com/leaderboard.json',
        {
          displayName: displayName,
          score: score,
        }
      )
      .subscribe((result) => console.log(result));
  }

  retrieveScoreFromDB() {
    return this.http.get(
      'https://quiz-app-d3777-default-rtdb.firebaseio.com/leaderboard.json'
    );
  }
}
