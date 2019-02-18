import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../login/authentication.service';

@Injectable()
export class JWTIntercepteurService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.authService.token;
    // httpRequest est immuable, il faut la cloner
    const clone = req.clone({ setHeaders: { Authorization: `Bearer ${jwtToken}`}});
    return next.handle(clone);
  }
}
