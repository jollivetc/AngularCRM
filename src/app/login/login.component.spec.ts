import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../app-material.module';
import { HelpComponent } from '../component/help/help.component';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule, AppMaterialModule],
      declarations: [ LoginComponent, HelpComponent ]
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
    const loginElement = fixture.nativeElement.querySelector('input#login');
    const passwordElement = fixture.nativeElement.querySelector('input#password');
    loginElement.value = 'myLogin';
    loginElement.dispatchEvent(new Event('input'));
    passwordElement.value = 'password';
    passwordElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(buttonElement.disabled).toBeFalse();
  });
});
