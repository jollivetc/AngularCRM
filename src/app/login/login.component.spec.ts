import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../app-material.module';
import { HelpComponent } from '../component/help/help.component';
import { LoginComponent } from './login.component';
import { AuthenticationService } from './authentication.service';
import { Observable, Subscriber } from 'rxjs';
import { User } from './model/user';
import { Router, UrlTree, NavigationExtras } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationServiceStub: Partial<AuthenticationService>;
  let routerStub: Partial<Router>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ LoginComponent, HelpComponent ],
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

  it('should call the authenticationService with the parameters', async(() => {
    // need to callThrough to get an observable to be subscribed to.
    spyOn(authenticationServiceStub, 'authentUser').and.callThrough();
    fillForm();
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    fixture.whenStable().then(() => {
      expect(authenticationServiceStub.authentUser).toHaveBeenCalledWith('myLogin', 'password');
    });
  }));
  it('navigate when the authentication is alright', async(()=>{
    // no need to call through as the returned Promise<boolean> is unused.
    spyOn(routerStub, 'navigateByUrl');
    // work with component and not element, no UI interaction is mandatory and it will be faster
    component.onSubmit();
    fixture.whenStable().then(() => {
      expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/home');
    });
  }));

});
