import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, take, throwError } from 'rxjs';

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

  userSubject: Subject<User> = new Subject();
  leaderboardData: Subject<any[]> = new Subject();

  getUser() {
    return this.loggedInUser;
  }

  setUser(displayName: string, email: string) {
    this.loggedInUser.displayName = displayName;
    this.loggedInUser.email = email;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<User>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwvhi6doLjJLtIB05D7LeRuHbu6G0NP1E',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        map((user: User) => {
          this.userSubject.next(user);
          return user;
        }),
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
      .post<User>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwvhi6doLjJLtIB05D7LeRuHbu6G0NP1E',
        {
          email: email,
          password: password,
          displayName: displayName,
          returnSecureToken: true,
        }
      )
      .pipe(
        map((user: User) => {
          this.userSubject.next(user);
          return user;
        }),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  storeScoreInDB(
    score: string,
    displayName: string = this.loggedInUser.displayName
  ) {
    if (+score > 0) {
      this.http
        .post(
          'https://quiz-app-d3777-default-rtdb.firebaseio.com/leaderboard.json',
          {
            displayName: displayName,
            score: score,
          }
        )
        .subscribe((result) => console.log(result));
    } else {
      return;
    }
  }

  retrieveScoreFromDB() {
    return this.http.get<any[]>(
      'https://quiz-app-d3777-default-rtdb.firebaseio.com/leaderboard.json'
    );
  }

  transformData(data: any[]): any[] {
    let result = Object.values(data);
    const uniqueObjects = Array.from(
      new Set(result.map((obj) => JSON.stringify(obj)))
    ).map((str) => JSON.parse(str));

    // Sort the array in descending order based on the score property
    uniqueObjects.sort((a, b) => b.score - a.score);

    // Pick the top 20 elements
    const top20 = uniqueObjects.slice(0, 20);

    // Convert the 'score' property from string to number
    top20.forEach((obj) => {
      obj.score = parseFloat(obj.score).toFixed(3);
    });
    return top20;
  }
}
