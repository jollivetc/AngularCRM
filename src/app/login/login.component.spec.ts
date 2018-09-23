import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HelpComponent } from '../component/help/help.component';
import { ButtonComponent } from '../component/button/button.component';
import { MdlTextFieldComponent, MdlTextFieldModule, MdlButtonModule, MdlIconModule } from '@angular-mdl/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MdlTextFieldModule, MdlButtonModule, MdlIconModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ LoginComponent, HelpComponent, ButtonComponent ]
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
});

