import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './model/user';

const USER_STORAGE_KEY = 'angular-crm.user';
const JWT_STORAGE_KEY = 'angular-crm.jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser?: User;
  private jwtToken?: string;

  constructor(private http: HttpClient) {
    if(sessionStorage.getItem(USER_STORAGE_KEY)){
      this.currentUser = JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY)!);
      this.jwtToken = sessionStorage.getItem(JWT_STORAGE_KEY)!;
    }
   }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  get token(): string|undefined {
    return this.jwtToken;
  }

  authentUser(login: string, password: string): Observable<User> {
    return this.http.post<AuthentResponse>('/api/auth/login',{email:login,password}).pipe(
      map((response:AuthentResponse)=>{
        this.currentUser = response.user;
        this.jwtToken = response.token;

        sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.currentUser));
        sessionStorage.setItem(JWT_STORAGE_KEY, this.jwtToken);
        return this.currentUser;
      })
    );
  }

  logout(): void {
    this.currentUser = undefined;
    this.jwtToken = undefined;
    sessionStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(JWT_STORAGE_KEY)
  }
}

interface AuthentResponse {
  user: User,
  token: string
}
