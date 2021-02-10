import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {JWTIntercepteurService} from './jwtintercepteur.service';
import {AuthenticationService} from '../login/authentication.service';
import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

describe('JWTIntercepteurService', () => {
  let service: JWTIntercepteurService;
  const authService = jasmine.createSpyObj('authenticationService', [], {'token': 'aToken'});

  beforeEach(() => {
    service = new JWTIntercepteurService(authService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add the token from the authenticationService to headers', () => {
    // const spyOnToken = spyOnProperty(authenticationServiceStub, 'token', 'get').and.callThrough();
    const httpRequest = new HttpRequest('GET', 'anUrl', {foo: 'bar'}, {headers: new HttpHeaders({anHeader: 'anHeaderValue'})});
    const nextHandlerStub = new (class MyHandler extends HttpHandler {
      handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        // do nothing with subscriber, it will be spied on.
        return new Observable((subscriber) => {
        });
      }
    })();
    const nextHandlerSpy: jasmine.Spy = spyOn(nextHandlerStub, 'handle');
    service.intercept(httpRequest, nextHandlerStub);
    // should have call the next handler with an HttpRequest.
    expect(nextHandlerStub.handle).toHaveBeenCalledWith(jasmine.any(HttpRequest));
    // retrieve the HttpRequest passed to next Handler
    const nextHttpRequest = (nextHandlerSpy.calls.argsFor(0)[0] as HttpRequest<any>);
    // should have added an header with token
    expect(nextHttpRequest.headers.get('Authorization')).toEqual('Bearer aToken');
    // should have keep existing headers
    expect(nextHttpRequest.headers.get('anHeader')).toEqual('anHeaderValue');
  });
});
