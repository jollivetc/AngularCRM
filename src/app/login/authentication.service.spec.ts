import {TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthenticationService} from './authentication.service';
import {User} from './model/user';

describe('AuthenticationService', () => {
  let httpTestingController: HttpTestingController;
  const USER_STORAGE_KEY = 'angular-crm.user';
  const TOKEN_STORAGE_KEY = 'angular-crm-token';
  const fakeUser: User = {
    id: 42,
    login: 'aLogin',
    lastname: 'lastname',
    firstname: 'firstname'
  };
  const fakeToken = 'aToken';
  let store = {};
  const mockSessionStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    }
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));
  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    // clean the store
    store = {};
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('should be created', () => {
    const service: AuthenticationService = TestBed.inject(AuthenticationService);
    expect(service).toBeTruthy();
  });
  it('should call the server and transform the response and store the user and token', waitForAsync(() => {
    //prepare the server response.
    const response = {
      user: fakeUser,
      token: fakeToken
    };
    const service: AuthenticationService = TestBed.inject(AuthenticationService);
    service.authentUser('login', 'password').subscribe(data => {
      // assert treatment of response.
      expect(data).toBe(fakeUser);
      expect(service.authenticated).toBeTrue();
      expect(service.token).toBe(fakeToken);
    });
    // check the query sent.
    const req = httpTestingController.expectOne('/api/auth/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({email: 'login', password: 'password'});

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(response);
  }));

  it('should retrieve existing user and token from the sessionStorage and expose them on creation', () => {
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
  it('should clean the sessionStorage and attributes on disconnect', () => {
    // set Items in mockSessionStorage
    mockSessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fakeUser));
    mockSessionStorage.setItem(TOKEN_STORAGE_KEY, fakeToken);
    // mock the real SessionStorage
    spyOn(sessionStorage, 'removeItem').and.callFake(mockSessionStorage.removeItem);
    // get the service
    const service: AuthenticationService = TestBed.inject(AuthenticationService);
    service.disconnect();
    expect(service.authenticated).toBeFalse();
    expect(service.token).toBeNull();
    expect(service.currentUser).toBeNull();
    expect(mockSessionStorage.getItem(USER_STORAGE_KEY)).toBeNull();
    expect(mockSessionStorage.getItem(TOKEN_STORAGE_KEY)).toBeNull();
  });
});
