import {TestBed} from '@angular/core/testing';

import {AuthenticationGuard} from './authentication.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthenticationService} from './authentication.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let authenticationService: AuthenticationService;
  let router: Router;
  const activatedRouteSnapshot: Partial<ActivatedRouteSnapshot> = {};
  const routerStateSnapshot: Partial<RouterStateSnapshot> = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AuthenticationService]
    });
    guard = TestBed.inject(AuthenticationGuard);
    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should return true if the user is authenticated', () => {
    jest.spyOn(authenticationService, 'isAuthenticated', 'get').mockReturnValue(true);
    // guard return no observable so no need to subscribe or manage async.
    // @ts-ignore
    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toBeTruthy();
  });
  it('should return false if the user is not authenticated and call navigation', () => {
    jest.spyOn(authenticationService, 'isAuthenticated', 'get').mockReturnValue(false);
    jest.spyOn(router, 'navigateByUrl');
    // guard return no observable so no need to subscribe or manage async.
    // @ts-ignore
    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toBeFalsy();
    // with first call in expect, router should have been called
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
