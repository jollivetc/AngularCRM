import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { User } from './model/user';

describe('AuthenticationService', () => {
  let httpTestingController: HttpTestingController;
  const USER_STORAGE_KEY = 'angular-crm.user';
  const TOKEN_STORAGE_KEY = 'angular-crm-token';
  let store = {};
  const mockSessionStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));
  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('should be created', () => {
    const service: AuthenticationService = TestBed.inject(AuthenticationService);
    expect(service).toBeTruthy();
  });
  it('should call the server and transform the response and store the user and token', async(() => {
    //prepare the server response.
    const user: User = {
      id: 42,
      login: 'login',
      lastname: 'lastname',
      firstname: 'firstname'
    };
    const response = {
      user: user,
      token: 'aToken'
    };
    const service: AuthenticationService = TestBed.inject(AuthenticationService);
    service.authentUser('login', 'password').subscribe( data => {
      // assert treatment of response.
      expect(data).toBe(user);
      expect(service.authenticated).toBeTrue();
      expect(service.token).toBe('aToken');
    });
    // check the query sent.
    const req = httpTestingController.expectOne('/api/auth/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({email:'login', password: 'password'});

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(response);
  }));

  it('should retrieve existing user and token from the sessionStorage and expose them on creation', () => {
    const fakeUser: User = {
      id: 42,
      login: 'aLogin',
      lastname: 'lastname',
      firstname: 'firstname'
    };
    const fakeToken = 'aToken';
    spyOn(sessionStorage, 'getItem').and.callFake((key: string): string => {
      if (key === USER_STORAGE_KEY) {
        return JSON.stringify(fakeUser);
      }
      if (key === TOKEN_STORAGE_KEY) {
        return fakeToken;
      }
    });
    const service: AuthenticationService = TestBed.inject(AuthenticationService);
    expect(service.token).toEqual(fakeToken);
    expect(service.currentUser).toEqual(fakeUser);
  });
});
