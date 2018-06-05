import { Injectable } from '@angular/core';
import { IUser } from './model/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const USER_STORAGE_KEY: string = 'angular-crm.user';
const TOKEN_STORAGE_KEY: string = 'angular-crm.token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _currentUser: IUser = null;
  private _token: string = null;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem(USER_STORAGE_KEY) !== null) {
      this._currentUser = JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY));
      this._token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
    }
  }

  public get authenticated(): boolean {
    return this._currentUser !== null;
  }

  public get CurrentUser(): IUser {
    return this._currentUser;
  }

  public get token(): string {
    return this._token;
  }

  authentUser(login: string, password: string) {

    return this.http.post('/api/auth/login', { email: login, password: password })
      .pipe(
        map(
          (result: any) => {
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

  disconnect(): void {
    this._currentUser = null;
    this._token = null;
    sessionStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}
