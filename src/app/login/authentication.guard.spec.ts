import {AuthenticationGuard} from './authentication.guard';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;

  const router = jasmine.createSpyObj('router', ['navigateByUrl']);

  it('should be created', () => {
    const authService = jasmine.createSpyObj('authenticationService', [], {'authenticated': true});
    guard = new AuthenticationGuard(router, authService);
    expect(guard).toBeTruthy();
  });
  it('should return true if the user is authenticated', () => {
    const authService = jasmine.createSpyObj('authenticationService', [], {'authenticated': true});
    guard = new AuthenticationGuard(router, authService);
    // can pass null as parameters are unused
    // guard return no observable so no need to subscribe or manage async.
    expect(guard.canActivate(null, null)).toBeTrue();
  });
  it('should return false if the user is not authenticated and call navigation', () => {
    const authService = jasmine.createSpyObj('authenticationService', [], {'authenticated': false});
    guard = new AuthenticationGuard(router, authService);
    // can pass null as parameters are unused
    // guard return no observable so no need to subscribe or manage async.
    expect(guard.canActivate(null, null)).toBeFalse();
    // with first call in expect, router should have been called
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
