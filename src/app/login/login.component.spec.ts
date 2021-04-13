import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from '../app-material.module';
import {HelpComponent} from '../component/help/help.component';
import {LoginComponent} from './login.component';
import {AuthenticationService} from './authentication.service';
import {Observable, Subscriber} from 'rxjs';
import {User} from './model/user';
import {NavigationExtras, Router, UrlTree} from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationServiceStub: Partial<AuthenticationService>;
  //let authenticationServiceStub = jasmine.createSpyObj('AuthenticationService', ['authentUser', 'isAuthenticated', 'logout']);
  let routerStub: Partial<Router>;
  //let routerStub = jasmine.createSpyObj('Router', ['navigateByUrl']);

  authenticationServiceStub = {
    authentUser: (login: string, password: string): Observable<User> => {
      return new Observable((subscriber: Subscriber<User>) => {
        subscriber.next({
          id: 12,
          login,
          lastname: 'Doe',
          firstname: 'John'
        });
      });
    },
    get isAuthenticated(): boolean {
      return true;
    },
    logout: () => {
      // nothing to do in stub
    }
  };

  routerStub = {
    navigateByUrl: (url: string | UrlTree, extras?: NavigationExtras): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
  };

  function fillForm(): void {
    const loginElement = fixture.nativeElement.querySelector('input#login');
    const passwordElement = fixture.nativeElement.querySelector('input#password');
    loginElement.value = 'myLogin';
    loginElement.dispatchEvent(new Event('input'));
    passwordElement.value = 'password';
    passwordElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [LoginComponent, HelpComponent],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceStub},
        {provide: Router, useValue: routerStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should disable login button on creation', () => {
    const element = fixture.nativeElement;
    expect(element.querySelector('button').disabled).toBeTrue();
  });

  it('should activate login button when form is valid', () => {
    const buttonElement = fixture.nativeElement.querySelector('button');
    fillForm();
    expect(buttonElement.disabled).toBeFalse();
  });

  it('should call the authenticationService with the parameters', waitForAsync(() => {
    spyOnAllFunctions(authenticationServiceStub);
    fillForm();
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    fixture.whenStable().then(() => {
      expect(authenticationServiceStub.authentUser).toHaveBeenCalledWith('myLogin', 'password');
    });
  }));
  it('navigate when the authentication is alright', waitForAsync(() => {
    spyOnAllFunctions(routerStub);
    // work with component and not element, no UI interaction is mandatory and it will be faster
    component.onSubmit();
    fixture.whenStable().then(() => {
      expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/home');
    });
  }));
  it('should call the disconnect method of the service in constructor if the user is authenticated', () => {
    const spyOnAuthenticated = spyOnProperty(authenticationServiceStub, 'isAuthenticated').and.callThrough();
    spyOnAllFunctions(authenticationServiceStub);

    // need to recreate the component to call the spy and mock
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(authenticationServiceStub.logout).toHaveBeenCalled();
    expect(spyOnAuthenticated).toHaveBeenCalled();
  });
});
