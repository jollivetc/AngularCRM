import {TestBed} from '@angular/core/testing';

import {AuthenticationGuard} from './authentication.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let authenticationService: AuthenticationService;
  let router: Router;

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
    spyOnProperty(authenticationService, 'authenticated').and.returnValue(true);
    // can pass null as parameters are unused
    // guard return no observable so no need to subscribe or manage async.
    expect(guard.canActivate(null, null)).toBeTrue();
  });
  it('should return false if the user is not authenticated and call navigation', () => {
    spyOnProperty(authenticationService, 'authenticated').and.returnValue(false);
    spyOn(router, 'navigateByUrl');
    // can pass null as parameters are unused
    // guard return no observable so no need to subscribe or manage async.
    expect(guard.canActivate(null, null)).toBeFalse();
    // with first call in expect, router should have been called
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
