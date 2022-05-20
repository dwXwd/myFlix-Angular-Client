import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://dennisflix.herokuapp.com/';

const token = localStorage.getItem('token');

const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'login', userDetails)
    .pipe(catchError(this.handleError)
    );
  }

  // get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
       map(this.extractResponseData),
       catchError(this.handleError));
  }

  // get a singe movie's detail
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
 }

  // get a details of a movie's director
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
 }

  // get a details of a movie's genre
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/genre/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
 }
  // get favorite movies
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
 }

  // add movie to the favorite movies list
  addFavoriteMovies(id:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .post(apiUrl + `users/${username}/movies/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
 }

  // delete movie from the favorite movies list
  deleteFavoriteMovies(id:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + `users/${username}/movies/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
 }

  // get the user's profile information
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
 }

  // edit the user's profile 
  editUserProfile(userData:object): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .put(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
 }

  // delete the user's profile
  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
 }

private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}