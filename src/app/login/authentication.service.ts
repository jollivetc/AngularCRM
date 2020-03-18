import { Injectable } from '@angular/core';
import { User } from './model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const USER_STORAGE_KEY = 'angular-crm.user';
const TOKEN_STORAGE_KEY = 'angular-crm-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _currentUser: User = null;
  private _token: string = null;

  constructor(private httpClient: HttpClient) {
    // Check user cnnected ?
    if (sessionStorage.getItem(USER_STORAGE_KEY) !== null) {
      this._currentUser = JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY));
      this._token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
    }
  }

  public get authenticated(): boolean {
    return this.currentUser !== null;
  }
  public get currentUser(): User {
    return this._currentUser;
  }
  public get token(): string {
    return this._token;
  }
  public authentUser(login: string, password: string): Observable<User> {
    return this.httpClient.post('/api/auth/login', { email: login, password })
    .pipe(
      map(
        (result: AuthentResponse) => {
          console.log('result', result);

          this._currentUser = result.user;
          this._token = result.token;

          sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this._currentUser));
          sessionStorage.setItem(TOKEN_STORAGE_KEY, this._token);

          return this._currentUser;
        }
      )
    );
  }
  public disconnect(): void {
    this._currentUser = null;
    this._token = null;
    sessionStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}
interface AuthentResponse {
  user: User;
  token: string;
}
