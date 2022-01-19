import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {JWTIntercepteurService} from './jwtintercepteur.service';
import {AuthenticationService} from '../login/authentication.service';
import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

describe('JWTIntercepteurService', () => {

  const authenticationServiceStub: Partial<AuthenticationService> = {
    get token(): string {
      return 'aToken';
    }
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      JWTIntercepteurService,
      {provide: AuthenticationService, useValue: authenticationServiceStub}
    ]
  }));

  it('should be created', () => {
    const service: JWTIntercepteurService = TestBed.inject(JWTIntercepteurService);
    expect(service).toBeTruthy();
  });
  it('should add the token from the authenticationService to headers', () => {
    const spyOnToken = jest.spyOn(authenticationServiceStub, 'token', 'get');
    const httpRequest = new HttpRequest('GET', 'anUrl', {foo: 'bar'}, {headers: new HttpHeaders({anHeader: 'anHeaderValue'})});
    const nextHandlerStub = new (class MyHandler extends HttpHandler {
      handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        // do nothing with subscriber, it will be spied on.
        return new Observable((subscriber) => {
        });
      }
    })();
    const nextHandlerSpy = jest.spyOn(nextHandlerStub, 'handle');
    const service: JWTIntercepteurService = TestBed.inject(JWTIntercepteurService);
    service.intercept(httpRequest, nextHandlerStub);
    // should have retrieve the token from authentication service.
    expect(spyOnToken).toHaveBeenCalled();
    // should have call the next handler with an HttpRequest.
    expect(nextHandlerStub.handle).toHaveBeenCalledWith(expect.any(HttpRequest));
    // retrieve the HttpRequest passed to next Handler
    const nextHttpRequest = (nextHandlerSpy.mock.calls[0][0] as HttpRequest<any>);
    // should have added an header with token
    expect(nextHttpRequest.headers.get('Authorization')).toEqual('Bearer aToken');
    // should have keep existing headers
    expect(nextHttpRequest.headers.get('anHeader')).toEqual('anHeaderValue');
  });
});
